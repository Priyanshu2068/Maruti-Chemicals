import re
import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def parse_products():
    with open('src/App.jsx', 'r', encoding='utf-8') as f:
        text = f.read()

    # Find the CHEMICAL_PRODUCTS array
    start_idx = text.find('const CHEMICAL_PRODUCTS = [')
    end_idx = text.find('// 5 Industrial Categories with Icons')
    if start_idx == -1 or end_idx == -1:
        print("Could not locate products slice")
        return []

    slice_text = text[start_idx:end_idx]

    # Split by object { id: '...'
    chunks = slice_text.split('{')
    products = []
    
    for chunk in chunks:
        if "id: '" not in chunk:
            continue
        
        def extract(field):
            m = re.search(rf"{field}:\s*['\"]([^'\"]+)['\"]", chunk)
            return m.group(1) if m else ""

        p_id = extract("id")
        p_name = extract("name")
        p_cas = extract("cas")
        p_category = extract("category")
        p_grade = extract("grade")
        p_packaging = extract("packaging")
        p_image = extract("image")

        if p_name and p_image:
            products.append({
                "id": p_id,
                "name": p_name,
                "cas": p_cas,
                "category": p_category,
                "grade": p_grade,
                "packaging": p_packaging,
                "image": p_image
            })

    return products

def build_docx(products):
    doc = Document()

    # Page Margins (0.75 in)
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(0.75)
        section.bottom_margin = Inches(0.75)
        section.left_margin = Inches(0.75)
        section.right_margin = Inches(0.75)

    primary_color = RGBColor(2, 132, 199)    # #0284c7 Sky Blue
    dark_color = RGBColor(15, 23, 42)        # #0f172a Slate 900
    gray_color = RGBColor(100, 116, 139)     # Slate 500

    # Header / Title
    title_p = doc.add_paragraph()
    title_run = title_p.add_run("MARUTI CHEMICALS")
    title_run.font.name = "Arial"
    title_run.font.size = Pt(22)
    title_run.font.bold = True
    title_run.font.color.rgb = primary_color
    title_p.paragraph_format.space_after = Pt(2)

    subtitle_p = doc.add_paragraph()
    sub_run = subtitle_p.add_run("Website Image Dimensions, Technical Specifications & Replacement Guide")
    sub_run.font.name = "Arial"
    sub_run.font.size = Pt(13)
    sub_run.font.bold = True
    sub_run.font.color.rgb = dark_color
    subtitle_p.paragraph_format.space_after = Pt(12)

    # Note
    meta_p = doc.add_paragraph()
    meta_run = meta_p.add_run("Project: Maruti Chemicals Corporate B2B Portal  |  Platform: React + Tailwind CSS  |  Total Products: 40")
    meta_run.font.name = "Arial"
    meta_run.font.size = Pt(9.5)
    meta_run.font.italic = True
    meta_run.font.color.rgb = gray_color
    meta_p.paragraph_format.space_after = Pt(16)

    # Section 1: Overview & Quick Reference Table
    h1 = doc.add_heading(level=1)
    h1_run = h1.add_run("1. Master Image Specifications Summary")
    h1_run.font.name = "Arial"
    h1_run.font.size = Pt(14)
    h1_run.font.color.rgb = primary_color

    intro = doc.add_paragraph(
        "This document details the exact dimensions, aspect ratios, responsive scaling rules, "
        "and replacement steps for all product images used across the Maruti Chemicals portal. "
        "Adhering to these specifications ensures sharp visual quality without layout shifts or slow page loads."
    )
    intro.runs[0].font.name = "Arial"
    intro.runs[0].font.size = Pt(10)

    # Master Table
    table1 = doc.add_table(rows=1, cols=5)
    table1.alignment = WD_TABLE_ALIGNMENT.CENTER
    table1.autofit = False

    col_widths = [Inches(1.8), Inches(1.3), Inches(1.2), Inches(1.4), Inches(1.3)]

    headers = ["UI Component", "Rendered Size (CSS)", "Aspect Ratio", "Recommended Upload", "File Format"]
    hdr_cells = table1.rows[0].cells
    for i, title in enumerate(headers):
        hdr_cells[i].text = title
        set_cell_background(hdr_cells[i], "0284C7")
        p = hdr_cells[i].paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        for r in p.runs:
            r.font.name = "Arial"
            r.font.size = Pt(9.5)
            r.font.bold = True
            r.font.color.rgb = RGBColor(255, 255, 255)

    specs_data = [
        ("Product Catalog Cards", "w-full × h-48\n(192px height, ~280-360px width)", "16:10 or 3:2\n(Landscape)", "800 × 500 px\n(or 1200 × 750 px)", "WebP / JPG / PNG\n(< 120 KB)"),
        ("Technical Specs Modal Header", "max-w-2xl × h-44\n(672px × 176px)", "3.8 : 1\n(Wide Banner)", "1200 × 350 px\n(or 800 × 300 px)", "WebP / JPG\n(< 150 KB)"),
        ("Retina / High-DPI Displays", "Responsive 2x scaling", "16:10", "1600 × 1000 px", "WebP (< 250 KB)"),
        ("Brand Logo Icon", "w-11 × h-11 (44px × 44px)", "1:1 (Square)", "512 × 512 px", "SVG / PNG Transparent")
    ]

    for row_data in specs_data:
        row_cells = table1.add_row().cells
        for i, val in enumerate(row_data):
            row_cells[i].text = val
            p = row_cells[i].paragraphs[0]
            p.runs[0].font.name = "Arial"
            p.runs[0].font.size = Pt(9)
            set_cell_margins(row_cells[i], top=100, bottom=100, left=120, right=120)

    # Set column widths
    for row in table1.rows:
        for idx, width in enumerate(col_widths):
            row.cells[idx].width = width

    doc.add_paragraph().paragraph_format.space_after = Pt(10)

    # Section 2: Important Image Design Guidelines
    h2 = doc.add_heading(level=1)
    h2_run = h2.add_run("2. Best Practices for Product Photography & Replacement")
    h2_run.font.name = "Arial"
    h2_run.font.size = Pt(14)
    h2_run.font.color.rgb = primary_color

    guidelines = [
        ("Center Subject Framing: ", "The CSS uses 'object-cover', which crops edges slightly across mobile and desktop. Always keep the primary subject (chemical bottle, drum, crystals, or packaging) in the central 70% of the image."),
        ("Clean Backgrounds: ", "Industrial B2B clients respond best to clean white backgrounds, sterile laboratory backdrops, or well-organized warehouse/factory pallet shots."),
        ("Optimal Compression: ", "Keep image files under 150 KB. Use WebP format (or modern progressive JPG) to maintain lightning-fast page loading and Google Core Web Vitals scores."),
        ("Standard Naming Convention: ", "Use lowercase, hyphenated descriptive filenames like 'glycerin-usp.webp', 'isopropyl-alcohol-drum.webp', or 'sodium-bicarbonate-bag.webp'. Avoid spaces and special characters.")
    ]

    for b_title, b_desc in guidelines:
        p = doc.add_paragraph(style='List Bullet')
        r1 = p.add_run(b_title)
        r1.font.name = "Arial"
        r1.font.size = Pt(9.5)
        r1.font.bold = True
        r1.font.color.rgb = dark_color

        r2 = p.add_run(b_desc)
        r2.font.name = "Arial"
        r2.font.size = Pt(9.5)

    doc.add_paragraph().paragraph_format.space_after = Pt(10)

    # Section 3: How to Replace Images in the Source Code
    h3 = doc.add_heading(level=1)
    h3_run = h3.add_run("3. Step-by-Step Image Replacement Instructions")
    h3_run.font.name = "Arial"
    h3_run.font.size = Pt(14)
    h3_run.font.color.rgb = primary_color

    p_code_steps = doc.add_paragraph()
    r_code_steps = p_code_steps.add_run(
        "To replace any product image with your own custom photograph:\n"
        "1. Place your new image file inside the 'public/products/' folder (e.g., 'public/products/glycerin.webp').\n"
        "2. Open 'src/App.jsx' in your editor.\n"
        "3. Locate the 'CHEMICAL_PRODUCTS' list (starting at line 42).\n"
        "4. Find the matching Product ID from the table below.\n"
        "5. Update the 'image' property from the Unsplash URL to your local path: image: '/products/glycerin.webp'.\n"
        "6. Save the file. Vite dev server will instantly hot-reload and display your new image."
    )
    r_code_steps.font.name = "Arial"
    r_code_steps.font.size = Pt(9.5)
    p_code_steps.paragraph_format.space_after = Pt(16)

    # Section 4: All 40 Products Image Inventory
    h4 = doc.add_heading(level=1)
    h4_run = h4.add_run(f"4. Complete Inventory of All 40 Chemical Products ({len(products)} Items)")
    h4_run.font.name = "Arial"
    h4_run.font.size = Pt(14)
    h4_run.font.color.rgb = primary_color

    table2 = doc.add_table(rows=1, cols=6)
    table2.alignment = WD_TABLE_ALIGNMENT.CENTER
    table2.autofit = False

    t2_widths = [Inches(0.5), Inches(1.8), Inches(1.4), Inches(1.0), Inches(1.1), Inches(1.2)]
    t2_headers = ["#", "Chemical Name", "Industrial Sector", "CAS No.", "Target Size", "Suggested File Name"]

    t2_hdr_cells = table2.rows[0].cells
    for i, title in enumerate(t2_headers):
        t2_hdr_cells[i].text = title
        set_cell_background(t2_hdr_cells[i], "0F172A") # Slate 900
        p = t2_hdr_cells[i].paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        for r in p.runs:
            r.font.name = "Arial"
            r.font.size = Pt(8.5)
            r.font.bold = True
            r.font.color.rgb = RGBColor(255, 255, 255)

    for idx, p in enumerate(products, 1):
        # Slugify name for suggested file name
        slug = re.sub(r'[^a-zA-Z0-9]+', '-', p['name'].lower()).strip('-')
        suggested_name = f"{p['id']}-{slug}.webp"

        row_cells = table2.add_row().cells
        row_data = [
            str(idx),
            p['name'],
            p['category'],
            p['cas'],
            "800 × 500 px",
            suggested_name
        ]

        bg_color = "F8FAFC" if idx % 2 == 0 else "FFFFFF"

        for i, val in enumerate(row_data):
            row_cells[i].text = val
            set_cell_background(row_cells[i], bg_color)
            set_cell_margins(row_cells[i], top=70, bottom=70, left=80, right=80)
            p_cell = row_cells[i].paragraphs[0]
            if i in [0, 3, 4]:
                p_cell.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_cell.runs[0].font.name = "Arial"
            p_cell.runs[0].font.size = Pt(8)
            if i == 1:
                p_cell.runs[0].font.bold = True

    # Set column widths
    for row in table2.rows:
        for idx, width in enumerate(t2_widths):
            row.cells[idx].width = width

    # Save Document
    output_path = "Maruti_Chemicals_Image_Dimensions_Guide.docx"
    doc.save(output_path)
    print(f"Successfully created: {output_path}")

if __name__ == "__main__":
    products = parse_products()
    print(f"Parsed {len(products)} products from App.jsx")
    build_docx(products)
