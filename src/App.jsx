import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  FlaskConical,
  Search,
  ShoppingCart,
  Moon,
  Sun,
  X,
  Plus,
  Trash2,
  CheckCircle,
  FileText,
  ShieldCheck,
  Globe2,
  Clock,
  Award,
  ChevronRight,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Package,
  Layers,
  Send,
  Check,
  AlertCircle,
  Menu,
  Truck,
  Headphones,
  ClipboardCheck,
  Building2,
  BadgeCheck,
  Palette
} from 'lucide-react';

import {
  INDUSTRY_CATEGORIES,
  MEDICAL_PRODUCTS as PRODUCT_LISTINGS,
  MEDICAL_CATEGORIES
} from './medicalProducts';

const CATEGORY_ICONS = {
  tape: Layers,
  wound: ShieldCheck,
  therapy: Package,
  infection: ShieldCheck,
  skin: CheckCircle,
  sterilisation: ClipboardCheck,
  temperature: Clock,
  monitoring: Award,
  healthcare: ShieldCheck,
  laboratory: FlaskConical,
  pharmaceutical: Building2,
  theatre: ClipboardCheck,
  clinic: CheckCircle,
  research: Globe2,
  handrub: FlaskConical,
  scrub: ShieldCheck,
  wash: CheckCircle,
  disinfectant: ShieldCheck,
  hospital_disinfectant: Building2,
  instrument: ClipboardCheck,
  instrument_clean: FlaskConical,
  alcohol_surface: FlaskConical,
  sporicidal: AlertCircle,
  fogging: Globe2,
  anaesthesia: Clock,
  accessory: Package
};

const CATEGORIES = INDUSTRY_CATEGORIES.map((category) => ({
  ...category,
  icon: CATEGORY_ICONS[category.icon] || ShieldCheck
}));

const PRODUCT_CATEGORIES = MEDICAL_CATEGORIES.map((category) => ({
  ...category,
  icon: CATEGORY_ICONS[category.icon] || Package
}));

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const getHighResolutionProductImage = (image) => {
  if (!image?.includes('multimedia.3m.com/mws/media/')) return image;
  return /[?&]width=\d+/i.test(image)
    ? image.replace(/([?&]width=)\d+/i, '$11200')
    : `${image}?width=1200`;
};

const getPageFromPath = (pathname = window.location.pathname) => {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const path = hash || pathname;
  const segments = path.split('/').filter(Boolean);
  const routeKeywords = ['category', 'group', 'product', 'brand'];
  const keywordIdx = segments.findIndex((s) => routeKeywords.includes(s));

  if (keywordIdx !== -1 && segments[keywordIdx + 1]) {
    const type = segments[keywordIdx];
    const rawVal = segments[keywordIdx + 1];
    return { type, value: type === 'brand' ? decodeURIComponent(rawVal) : rawVal };
  }
  return { type: 'home', value: '' };
};

const getRouteUrl = (path) => {
  const isHashMode = Boolean(window.location.hash);
  if (isHashMode) {
    return `#${path.startsWith('/') ? path : `/${path}`}`;
  }
  const segments = window.location.pathname.split('/').filter(Boolean);
  const routeKeywords = ['category', 'group', 'product', 'brand'];
  const keywordIdx = segments.findIndex((s) => routeKeywords.includes(s));
  const prefix = keywordIdx > 0 ? '/' + segments.slice(0, keywordIdx).join('/') : '';
  return prefix + (path.startsWith('/') ? path : `/${path}`);
};

// 7-Step Workflow Process Data
const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Choose a Product',
    desc: 'Browse products by industry, then open a product line to view its sub-products.',
    icon: Search
  },
  {
    step: '02',
    title: 'Select a Product Variant',
    desc: 'Review available product types, sizes, and pack quantities.',
    icon: FlaskConical
  },
  {
    step: '03',
    title: 'Check Manufacturer Information',
    desc: 'Review available product information and follow the manufacturer reference where listed.',
    icon: ShieldCheck
  },
  {
    step: '04',
    title: 'Add to Enquiry Cart',
    desc: 'Add the selected product, size, and quantity to your enquiry cart.',
    icon: ClipboardCheck
  },
  {
    step: '05',
    title: 'Send an Enquiry',
    desc: 'Share your requirements with the Maruti Chemicals procurement team.',
    icon: Package
  },
  {
    step: '06',
    title: 'Confirm Availability',
    desc: 'Confirm current regional availability, compatibility, and fulfilment details.',
    icon: Truck
  },
  {
    step: '07',
    title: 'Get Product Support',
    desc: 'Contact Maruti Chemicals for assistance with your product enquiry.',
    icon: Headphones
  }
];

// Principals & Partner Brands
const PRINCIPAL_BRANDS = ['3M', 'Raman & Weil'];

// Product information highlights
const CREDENTIALS = [
  {
    title: '3M India Product Links',
    desc: 'Manufacturer pages are linked from product listings where available',
    icon: Building2
  },
  {
    title: 'Product Variants',
    desc: 'Choose listed product types and sizes on the product detail page',
    icon: FileText
  },
  {
    title: 'Availability Check',
    desc: 'Confirm stock, product codes, and pack sizes with the manufacturer',
    icon: Award
  },
  {
    title: 'Product Enquiries',
    desc: 'Send a request with the product and size you need',
    icon: ShieldCheck
  }
];

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(() => getPageFromPath());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [industriesMenuOpen, setIndustriesMenuOpen] = useState(false);
  const [brandsMenuOpen, setBrandsMenuOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState(() => {
    const init = getPageFromPath();
    return init.type === 'brand' ? decodeURIComponent(init.value) : 'All';
  });
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [detailQuantity, setDetailQuantity] = useState('1');

  // RFQ Cart state
  const [cart, setCart] = useState([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Modal states
  const [activeSpecProduct, setActiveSpecProduct] = useState(null);
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [rfqTargetProduct, setRfqTargetProduct] = useState(null);
  const [rfqSuccessRef, setRfqSuccessRef] = useState(null);

  // RFQ Checkout form fields
  const [rfqForm, setRfqForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    destination: '',
    taxId: '',
    incoterm: 'FOB India Port (Nhava Sheva / Mundra)',
    instructions: ''
  });

  const [currentIndustry, setCurrentIndustry] = useState(() => {
    const initialPage = getPageFromPath();
    if (initialPage.type === 'category') {
      return CATEGORIES.find((category) => slugify(category.name) === initialPage.value)?.name || null;
    }
    return null;
  });

  const navigateTo = (path, options = {}) => {
    const isHashMode = Boolean(window.location.hash);
    if (isHashMode) {
      window.location.hash = path.startsWith('/') ? path : `/${path}`;
    } else {
      const segments = window.location.pathname.split('/').filter(Boolean);
      const routeKeywords = ['category', 'group', 'product', 'brand'];
      const keywordIdx = segments.findIndex((s) => routeKeywords.includes(s));
      const prefix = keywordIdx > 0 ? '/' + segments.slice(0, keywordIdx).join('/') : '';
      const targetUrl = prefix + (path.startsWith('/') ? path : `/${path}`);
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({}, '', targetUrl);
      }
    }
    const nextPage = getPageFromPath(path);
    setPage(nextPage);
    if (nextPage.type === 'category') {
      const catName = CATEGORIES.find((category) => slugify(category.name) === nextPage.value)?.name || null;
      setCurrentIndustry(catName);
      setSelectedCategory(catName || 'All');
    } else if (nextPage.type === 'home') {
      setCurrentIndustry(null);
      setSelectedCategory('All');
    } else if (nextPage.type === 'brand') {
      setSelectedBrand(decodeURIComponent(nextPage.value));
    } else if (nextPage.type === 'group') {
      if (!currentIndustry) {
        const groupCat = PRODUCT_CATEGORIES.find((pc) => slugify(pc.name) === nextPage.value)?.name;
        const parentInd = CATEGORIES.find((c) => c.productCategories.includes(groupCat))?.name || null;
        if (parentInd) setCurrentIndustry(parentInd);
      }
    }
    setIndustriesMenuOpen(false);
    setBrandsMenuOpen(false);
    setMobileMenuOpen(false);
    setSearchQuery('');
    if (options.scrollToSectors) {
      setTimeout(() => {
        const el = document.getElementById('sectors') || document.getElementById('products');
        if (el) {
          const rect = el.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo({ top: scrollTop + rect.top - 80, behavior: 'smooth' });
        }
      }, 50);
    } else if (!options.preventScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLinkClick = (e, path, options = {}) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
      e.preventDefault();
      navigateTo(path, options);
    }
  };

  useEffect(() => {
    const handleNavigation = () => {
      const nextPage = getPageFromPath();
      setPage(nextPage);
      if (nextPage.type === 'category') {
        const catName = CATEGORIES.find((category) => slugify(category.name) === nextPage.value)?.name || null;
        setCurrentIndustry(catName);
        setSelectedCategory(catName || 'All');
      } else if (nextPage.type === 'home') {
        setCurrentIndustry(null);
        setSelectedCategory('All');
        setSelectedBrand('All');
      } else if (nextPage.type === 'brand') {
        setSelectedBrand(decodeURIComponent(nextPage.value));
      }
    };
    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('hashchange', handleNavigation);
    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('hashchange', handleNavigation);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeCategory = page.type === 'category'
    ? CATEGORIES.find((category) => slugify(category.name) === page.value)
    : null;
  const activeProductCategory = page.type === 'group'
    ? PRODUCT_CATEGORIES.find((category) => slugify(category.name) === page.value)
    : null;
  const activeProduct = page.type === 'product'
    ? PRODUCT_LISTINGS.find((product) => product.id === page.value)
    : null;

  const effectiveIndustry = activeCategory
    ? activeCategory.name
    : currentIndustry || (activeProductCategory ? CATEGORIES.find(c => c.productCategories.includes(activeProductCategory.name))?.name : null) || (activeProduct ? (activeProduct.industries?.[0] || CATEGORIES.find(c => c.productCategories.includes(activeProduct.category))?.name) : null);

  useEffect(() => {
    setSelectedVariant(activeProduct?.packOptions?.[0] || '');
    setSelectedColor(activeProduct?.colorOptions?.[0] || '');
    setDetailQuantity('1');
    setSelectedImageIndex(0);
  }, [activeProduct?.id]);

  // Toggle Dark Mode class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Cart Helper functions
  const isInCart = (productId, packaging, color) => cart.some(item =>
    item.product.id === productId &&
    (packaging === undefined || item.packaging === packaging) &&
    (color === undefined || !item.color || item.color === color)
  );

  const toggleCartItem = (product, variant = product.packOptions[0], color = (product.colorOptions?.[0] || ''), quantity = '1') => {
    const cartItemId = `${product.id}::${variant}::${color}`;
    if (isInCart(product.id, variant, color)) {
      setCart(cart.filter(item => item.cartItemId !== cartItemId));
    } else {
      setCart([...cart, {
        cartItemId,
        product,
        quantity,
        packaging: variant,
        color: color
      }]);
    }
  };

  const updateCartItemQuantity = (cartItemId, newQuantity) => {
    setCart(cart.map(item => item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item));
  };

  const updateCartItemPackaging = (cartItemId, newPackaging) => {
    setCart(currentCart => {
      const currentItem = currentCart.find(item => item.cartItemId === cartItemId);
      if (!currentItem) return currentCart;

      const existingVariant = currentCart.find(item =>
        item.cartItemId !== cartItemId &&
        item.product.id === currentItem.product.id &&
        item.packaging === newPackaging &&
        (item.color || '') === (currentItem.color || '')
      );

      if (existingVariant) {
        return currentCart
          .filter(item => item.cartItemId !== cartItemId)
          .map(item => item.cartItemId === existingVariant.cartItemId
            ? { ...item, quantity: String(Number(item.quantity) + Number(currentItem.quantity)) }
            : item
          );
      }

      return currentCart.map(item => item.cartItemId === cartItemId
        ? { ...item, cartItemId: `${item.product.id}::${newPackaging}::${item.color || ''}`, packaging: newPackaging }
        : item
      );
    });
  };

  const updateCartItemColor = (cartItemId, newColor) => {
    setCart(currentCart => {
      const currentItem = currentCart.find(item => item.cartItemId === cartItemId);
      if (!currentItem) return currentCart;

      const existingVariant = currentCart.find(item =>
        item.cartItemId !== cartItemId &&
        item.product.id === currentItem.product.id &&
        item.packaging === currentItem.packaging &&
        item.color === newColor
      );

      if (existingVariant) {
        return currentCart
          .filter(item => item.cartItemId !== cartItemId)
          .map(item => item.cartItemId === existingVariant.cartItemId
            ? { ...item, quantity: String(Number(item.quantity) + Number(currentItem.quantity)) }
            : item
          );
      }

      return currentCart.map(item => item.cartItemId === cartItemId
        ? { ...item, cartItemId: `${item.product.id}::${item.packaging}::${newColor}`, color: newColor }
        : item
      );
    });
  };

  const removeCartItem = (cartItemId) => {
    setCart(cart.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Live filtered products calculation
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return PRODUCT_LISTINGS.filter(product => {
      if (!query && page.type === 'category') {
        if (product.industries && activeCategory) {
          if (!product.industries.includes(activeCategory.name)) return false;
        } else if (!activeCategory?.productCategories.includes(product.category)) {
          return false;
        }
      }
      if (!query && page.type === 'group' && product.category !== activeProductCategory?.name) return false;
      if (!query && page.type === 'brand') {
        const brandVal = page.value.toLowerCase();
        const prodBrand = product.brand.toLowerCase();
        if (brandVal === '3m') {
          if (prodBrand !== '3m' && !prodBrand.includes('littmann')) return false;
        } else if (prodBrand !== brandVal) {
          return false;
        }
      }
      if (selectedBrand !== 'All') {
        const b = selectedBrand.toLowerCase();
        const prodBrand = product.brand.toLowerCase();
        if (b === '3m') {
          if (prodBrand !== '3m' && !prodBrand.includes('littmann')) return false;
        } else if (prodBrand !== b) {
          return false;
        }
      }
      if (query) {
        const searchableText = [
          product.id,
          product.name,
          product.brand,
          product.line,
          product.category,
          product.model,
          product.description,
          ...(product.industries || []),
          ...(product.colorOptions || []),
          ...(product.packOptions || []),
          ...(product.applications || [])
        ].join(' ').toLowerCase();
        return searchableText.includes(query);
      }
      return true;
    });
  }, [searchQuery, page, activeCategory, activeProductCategory, selectedBrand]);

  const brandCounts = useMemo(() => {
    let prods = PRODUCT_LISTINGS;
    if (activeCategory) {
      prods = prods.filter(p => p.industries && p.industries.includes(activeCategory.name));
    }
    if (activeProductCategory) {
      prods = prods.filter(p => p.category === activeProductCategory.name);
    }
    const count3M = prods.filter(p => p.brand === '3M' || p.brand.toLowerCase().includes('littmann')).length;
    const countRW = prods.filter(p => p.brand.toLowerCase().includes('raman')).length;
    return {
      all: prods.length,
      '3M': count3M,
      'Raman & Weil': countRW
    };
  }, [activeCategory, activeProductCategory]);

  const visibleProductCategories = PRODUCT_CATEGORIES.filter(category =>
    filteredProducts.some(product => product.category === category.name)
  );
  const visibleIndustryCategories = CATEGORIES.filter(category =>
    filteredProducts.some(product => category.productCategories.includes(product.category))
  );
  const searchIsActive = searchQuery.trim().length > 0;
  const activeProductImages = activeProduct
    ? (activeProduct.gallery?.length ? activeProduct.gallery : activeProduct.image ? [activeProduct.image] : [])
    : [];

  const handleGoBack = () => {
    if (page.type === 'product') {
      if (activeProduct?.category) {
        navigateTo(`/group/${slugify(activeProduct.category)}`, { scrollToSectors: true });
      } else if (effectiveIndustry) {
        navigateTo(`/category/${slugify(effectiveIndustry)}`, { scrollToSectors: true });
      } else {
        navigateTo('/', { scrollToSectors: true });
      }
    } else if (page.type === 'group') {
      if (effectiveIndustry) {
        navigateTo(`/category/${slugify(effectiveIndustry)}`, { scrollToSectors: true });
      } else {
        navigateTo('/', { scrollToSectors: true });
      }
    } else if (page.type === 'category' || page.type === 'brand') {
      navigateTo('/', { scrollToSectors: true });
    } else if (searchIsActive) {
      setSearchQuery('');
    } else {
      navigateTo('/', { scrollToSectors: true });
    }
  };

  const searchSuggestions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return { products: [], categories: [], totalMatches: 0 };

    const matchedProducts = PRODUCT_LISTINGS.filter(product => {
      const searchableText = [
        product.id,
        product.name,
        product.brand,
        product.line,
        product.category,
        product.model,
        product.description,
        ...(product.industries || []),
        ...(product.colorOptions || []),
        ...(product.packOptions || []),
        ...(product.applications || [])
      ].join(' ').toLowerCase();
      return searchableText.includes(q);
    });

    const matchedCategories = PRODUCT_CATEGORIES.filter(cat =>
      cat.name.toLowerCase().includes(q)
    );

    return {
      products: matchedProducts.slice(0, 6),
      totalMatches: matchedProducts.length,
      categories: matchedCategories.slice(0, 3)
    };
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setSearchFocused(false);
    if (page.type !== 'home' && page.type !== 'category' && page.type !== 'group') {
      navigateTo('/');
    }
    setTimeout(() => {
      const el = document.getElementById('products') || document.getElementById('sectors');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const openSingleProductRfq = (product) => {
    setRfqTargetProduct(product);
    setIsRfqModalOpen(true);
  };

  const openBatchCartRfq = () => {
    setRfqTargetProduct(null);
    setIsCartDrawerOpen(false);
    setIsRfqModalOpen(true);
  };

  const handleRfqSubmit = (e) => {
    e.preventDefault();
    const generatedRef = `MC-RFQ-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setRfqSuccessRef(generatedRef);
  };

  const closeRfqSuccess = () => {
    setRfqSuccessRef(null);
    setIsRfqModalOpen(false);
    if (!rfqTargetProduct) {
      clearCart();
    }
  };

  const getCategoryCartCount = (catName) => {
    return cart.filter(item => {
      if (item.product.industries) return item.product.industries.includes(catName);
      const category = CATEGORIES.find((c) => c.name === catName);
      return category?.productCategories.includes(item.product.category);
    }).length;
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans ${
      darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#faf9f6] text-slate-900'
    }`}>
      
      {/* ========================================================
          1. STICKY GLOBAL HEADER (Distinctive Brand + Search + Only 1 Contact Us)
         ======================================================== */}
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-200 ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/95 border-sky-100 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group transition-transform duration-200 hover:scale-[1.02]"
            onClick={() => navigateTo('/')}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-tr from-[#0284c7] to-[#4fc3f7] text-white group-hover:shadow-sky-500/30 transition-all duration-300">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-xl sm:text-2xl text-[#0284c7] dark:text-[#4fc3f7]">
                  MARUTI
                </span>
                <span className="font-light tracking-wider text-xl sm:text-2xl text-slate-900 dark:text-white">
                  CHEMICALS
                </span>
              </div>
              <p className="text-[10px] font-medium tracking-wide uppercase text-slate-500 dark:text-slate-400">
                B2B Chemical Supply & Export
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-3 whitespace-nowrap text-xs font-semibold">
            <a
              href="/#products"
              className="relative text-slate-700 dark:text-slate-300 hover:text-[#0284c7] dark:hover:text-[#4fc3f7] transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0284c7] dark:after:bg-[#4fc3f7] hover:after:w-full after:transition-all after:duration-300"
            >
              Products
            </a>
            <div
              className="relative py-1"
              onMouseEnter={() => setIndustriesMenuOpen(true)}
              onMouseLeave={() => setIndustriesMenuOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={industriesMenuOpen}
                onClick={() => setIndustriesMenuOpen(open => !open)}
                className="whitespace-nowrap text-slate-700 dark:text-slate-300 hover:text-[#0284c7] dark:hover:text-[#4fc3f7] flex items-center gap-1 transition-colors py-1 cursor-pointer"
              >
                Industries <ChevronRight className={`inline h-3.5 w-3.5 transition-transform duration-200 ${industriesMenuOpen ? 'rotate-[270deg]' : 'rotate-90'}`} />
              </button>
              {industriesMenuOpen && (
                <div
                  className="absolute left-0 top-full z-[70] pt-1.5 w-[min(88vw,22rem)]"
                  onMouseEnter={() => setIndustriesMenuOpen(true)}
                  onMouseLeave={() => setIndustriesMenuOpen(false)}
                >
                  <div className={`grid grid-cols-1 gap-1 rounded-xl border p-2 shadow-2xl transition-all duration-200 ${
                    darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'
                  }`}>
                    {CATEGORIES.map((category) => (
                      <a
                        key={category.name}
                        href={getRouteUrl(`/category/${slugify(category.name)}`)}
                        onClick={(e) => {
                          setIndustriesMenuOpen(false);
                          handleLinkClick(e, `/category/${slugify(category.name)}`);
                        }}
                        className="w-full block rounded-lg px-3 py-2.5 text-left text-xs leading-snug hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        {category.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Brands Dropdown Menu with Hover */}
            <div
              className="relative py-1"
              onMouseEnter={() => setBrandsMenuOpen(true)}
              onMouseLeave={() => setBrandsMenuOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={brandsMenuOpen}
                onClick={() => setBrandsMenuOpen(open => !open)}
                className="whitespace-nowrap text-slate-700 dark:text-slate-300 hover:text-[#0284c7] dark:hover:text-[#4fc3f7] flex items-center gap-1 transition-colors py-1 cursor-pointer"
              >
                Brands <ChevronRight className={`inline h-3.5 w-3.5 transition-transform duration-200 ${brandsMenuOpen ? 'rotate-[270deg]' : 'rotate-90'}`} />
              </button>
              {brandsMenuOpen && (
                <div
                  className="absolute left-0 top-full z-[70] pt-1.5 w-56"
                  onMouseEnter={() => setBrandsMenuOpen(true)}
                  onMouseLeave={() => setBrandsMenuOpen(false)}
                >
                  <div className={`grid grid-cols-1 gap-1 rounded-xl border p-2 shadow-2xl transition-all duration-200 ${
                    darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'
                  }`}>
                    <button
                      type="button"
                      onClick={() => {
                        setBrandsMenuOpen(false);
                        setSelectedBrand('All');
                        navigateTo('/');
                      }}
                      className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs leading-snug hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
                    >
                      <span>All Brands</span>
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">88 products</span>
                    </button>
                    {['3M', 'Raman & Weil'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          setBrandsMenuOpen(false);
                          setSelectedBrand(b);
                          navigateTo(`/brand/${encodeURIComponent(b)}`);
                        }}
                        className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs leading-snug hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors font-bold text-slate-900 dark:text-white cursor-pointer"
                      >
                        <span className="text-[#0284c7] dark:text-[#4fc3f7]">{b}</span>
                        <span className="text-[10px] bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 px-1.5 py-0.5 rounded font-medium">
                          {b === '3M' ? '51 products' : '37 products'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <a
              href="/#process"
              className="relative text-slate-700 dark:text-slate-300 hover:text-[#0284c7] dark:hover:text-[#4fc3f7] transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0284c7] dark:after:bg-[#4fc3f7] hover:after:w-full after:transition-all after:duration-300"
            >
              Our Process
            </a>
            <a
              href="/#principals"
              className="relative text-slate-700 dark:text-slate-300 hover:text-[#0284c7] dark:hover:text-[#4fc3f7] transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0284c7] dark:after:bg-[#4fc3f7] hover:after:w-full after:transition-all after:duration-300"
            >
              Principals & Credentials
            </a>
            <a
              href="/#specs-info"
              className="relative text-slate-700 dark:text-slate-300 hover:text-[#0284c7] dark:hover:text-[#4fc3f7] transition-colors py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0284c7] dark:after:bg-[#4fc3f7] hover:after:w-full after:transition-all after:duration-300"
            >
              Quality & COA
            </a>
          </nav>

          {/* Action Controls: Dark Mode Toggle, RFQ Cart & ONE Contact Us Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className={`xl:hidden p-2.5 rounded-xl border transition ${
                darkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-200'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            {/* Dark/Light Mode Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
              className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 ${
                darkMode
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                  : 'bg-white border-slate-200 text-sky-600 hover:bg-slate-100'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* RFQ Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm bg-[#4fc3f7] hover:bg-[#38bdf8] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 text-slate-900"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">RFQ Cart</span>
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold bg-slate-950 text-white">
                {cart.length}
              </span>
            </button>

            {/* ONLY ONE Contact Us Button in header */}
            <a
              href="#contact"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </a>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className={`xl:hidden border-t px-4 py-3 ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-white'}`}>
            <div className="mx-auto flex max-w-7xl flex-col gap-1 text-sm font-semibold">
              <a href="/#products" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-sky-50 dark:hover:bg-slate-800">
                Products
              </a>
              <details className="rounded-lg">
                <summary className="cursor-pointer list-none rounded-lg px-3 py-2 hover:bg-sky-50 dark:hover:bg-slate-800">
                  Industries <ChevronRight className="inline h-3.5 w-3.5 rotate-90" />
                </summary>
                <div className="grid gap-1 pl-3">
                  {CATEGORIES.map((category) => (
                    <a
                      key={category.name}
                      href={getRouteUrl(`/category/${slugify(category.name)}`)}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        handleLinkClick(e, `/category/${slugify(category.name)}`);
                      }}
                      className="block rounded-lg px-3 py-2 text-left text-xs hover:bg-sky-50 dark:hover:bg-slate-800"
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              </details>
              <details className="rounded-lg">
                <summary className="cursor-pointer list-none rounded-lg px-3 py-2 hover:bg-sky-50 dark:hover:bg-slate-800">
                  Brands <ChevronRight className="inline h-3.5 w-3.5 rotate-90" />
                </summary>
                <div className="grid gap-1 pl-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSelectedBrand('All');
                      navigateTo('/');
                    }}
                    className="block w-full text-left rounded-lg px-3 py-2 text-xs hover:bg-sky-50 dark:hover:bg-slate-800"
                  >
                    All Brands (88 products)
                  </button>
                  {['3M', 'Raman & Weil'].map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setSelectedBrand(b);
                        navigateTo(`/brand/${encodeURIComponent(b)}`);
                      }}
                      className="block w-full text-left rounded-lg px-3 py-2 text-xs font-bold text-[#0284c7] dark:text-[#4fc3f7] hover:bg-sky-50 dark:hover:bg-slate-800"
                    >
                      {b} ({b === '3M' ? '51' : '37'})
                    </button>
                  ))}
                </div>
              </details>
              <a href="/#process" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-sky-50 dark:hover:bg-slate-800">
                Our Process
              </a>
              <a href="/#principals" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-sky-50 dark:hover:bg-slate-800">
                Principals & Credentials
              </a>
              <a href="/#specs-info" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-sky-50 dark:hover:bg-slate-800">
                Quality & COA
              </a>
            </div>
          </nav>
        )}

        {/* Search bar beneath the navigation with Live Suggestions Dropdown */}
        <div className={`px-4 sm:px-6 lg:px-8 pb-3 pt-2 border-t ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-white'}`}>
          <div ref={searchContainerRef} className="max-w-7xl mx-auto relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search medical products, brands, models, or sizes..."
                className={`w-full pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-[#0284c7] transition ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400' : 'bg-slate-100/80 border-slate-200 text-slate-900 placeholder-slate-500'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchFocused(false);
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  aria-label="Clear product search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Live Suggestions Dropdown Popover */}
            {searchFocused && searchQuery.trim().length > 0 && (
              <div className={`absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border shadow-2xl overflow-hidden transition-all duration-200 ${
                darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
              }`}>
                {/* Header */}
                <div className={`px-4 py-2.5 text-xs font-semibold flex items-center justify-between border-b ${
                  darkMode ? 'bg-slate-800/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-500'
                }`}>
                  <span>
                    {searchSuggestions.totalMatches > 0
                      ? `Found ${searchSuggestions.totalMatches} product${searchSuggestions.totalMatches === 1 ? '' : 's'}`
                      : 'No products matched'}
                  </span>
                  {searchSuggestions.totalMatches > 0 && (
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="text-[#0284c7] dark:text-[#4fc3f7] hover:underline font-bold text-xs inline-flex items-center gap-1 cursor-pointer"
                    >
                      View in catalog <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Categories matched */}
                {searchSuggestions.categories.length > 0 && (
                  <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Matching Categories</div>
                    <div className="flex flex-wrap gap-2">
                      {searchSuggestions.categories.map(cat => (
                        <button
                          key={cat.name}
                          type="button"
                          onClick={() => {
                            setSearchFocused(false);
                            navigateTo(`/group/${slugify(cat.name)}`);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] hover:bg-[#0284c7] hover:text-white transition cursor-pointer"
                        >
                          <Layers className="w-3 h-3" /> {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products list */}
                {searchSuggestions.products.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {searchSuggestions.products.map(prod => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setSearchFocused(false);
                          navigateTo(`/product/${prod.id}`);
                        }}
                        className="p-3 flex items-center gap-3.5 cursor-pointer transition hover:bg-sky-50/70 dark:hover:bg-slate-800/80 group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                          {prod.image ? (
                            <img
                              src={getHighResolutionProductImage(prod.image)}
                              alt={prod.name}
                              className="w-full h-full object-contain p-1 transition-transform group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <Package className="w-5 h-5 text-slate-400" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase text-[#0284c7] dark:text-[#4fc3f7]">{prod.brand}</span>
                            <span className="text-[10px] text-slate-400">·</span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{prod.category}</span>
                          </div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5 group-hover:text-[#0284c7] dark:group-hover:text-[#4fc3f7]">
                            {prod.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            Model: {prod.model}
                          </div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#0284c7] dark:group-hover:text-[#4fc3f7] flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                      No medical products found for "<span className="text-[#0284c7] dark:text-[#4fc3f7]">{searchQuery}</span>".
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1.5">
                      Try searching: "Avagard", "Ethylene", "Attest", "Tape", "Littmann", "Indicator"
                    </p>
                  </div>
                )}

                {/* Footer button */}
                {searchSuggestions.totalMatches > 0 && (
                  <div className={`p-2.5 text-center border-t ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="w-full py-2 px-4 rounded-xl text-xs font-bold bg-[#0284c7] text-white hover:bg-[#0369a1] transition shadow-sm inline-flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Show all {searchSuggestions.totalMatches} results in catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================
          2. HIGH-IMPACT CHEMICAL HERO (Distinctive Prompt Layout with Hover Effects)
         ======================================================== */}
      {page.type === 'home' && (
      <section className={`relative overflow-hidden border-b transition-colors duration-200 ${
        darkMode ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800' : 'bg-gradient-to-b from-sky-50 via-white to-[#faf9f6] border-sky-100'
      }`}>
        <div className="absolute inset-0 opacity-15 dark:opacity-5 pointer-events-none bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:18px_18px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-5 bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] border border-sky-200 dark:border-sky-800 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#0284c7]" /> Maruti Chemicals · Healthcare Supply
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-950 dark:text-white">
                Maruti Chemicals: Medical Products for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#4fc3f7]">
                  Clinical Care
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                Maruti Chemicals is a supplier and distributor serving pharmaceutical, industrial, and healthcare requirements. Browse medical and clinical products listed by industry from trusted partner brands including 3M and Raman & Weil, review product specifications, and send us an enquiry.
            </p>

            {/* Quick Hero CTAs with Hover Lift */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="px-7 py-3.5 rounded-xl font-bold text-sm bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md hover:shadow-xl hover:shadow-sky-500/30 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center gap-2 group"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>

              <a
                href="#contact"
                className={`px-7 py-3.5 rounded-xl font-bold text-sm border hover:-translate-y-1 active:translate-y-0 transition-all duration-300 ${
                  darkMode
                    ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800 hover:border-sky-500 hover:shadow-lg'
                    : 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50 hover:border-sky-400 hover:text-[#0284c7] hover:shadow-lg shadow-sm'
                }`}
              >
                Contact Procurement Desk
              </a>
            </div>
          </div>

          {/* 4 Quick Stats Grid with Interactive Hover Lift */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer group ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-sky-100 shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-mono">{CATEGORIES.length}</div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Industries Served</div>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer group ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-sky-100 shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-mono">{PRODUCT_LISTINGS.length}</div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Product Families</div>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer group ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-sky-100 shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-mono">3M & R&W</div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Partner Brands</div>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer group ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-sky-100 shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-mono">RFQ</div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Product Enquiries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ========================================================
          3. INDUSTRIAL CATALOG & MULTI-PRODUCT RFQ ENGINE (#products)
         ======================================================== */}
      {activeProduct && !searchIsActive ? (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Navigation Bar with Back Button & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:bg-[#0284c7] hover:text-white hover:border-[#0284c7] dark:hover:bg-[#0284c7] dark:hover:text-white transition-all duration-200 shadow-sm group active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to {activeProduct.category}</span>
          </button>

          <nav aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <a
                  href={getRouteUrl('/')}
                  onClick={(e) => handleLinkClick(e, '/')}
                  className="hover:text-[#0284c7] dark:hover:text-[#4fc3f7] font-medium transition-colors"
                >
                  All Industries
                </a>
              </li>
              {effectiveIndustry && (
                <li className="flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <a
                    href={getRouteUrl(`/category/${slugify(effectiveIndustry)}`)}
                    onClick={(e) => handleLinkClick(e, `/category/${slugify(effectiveIndustry)}`)}
                    className="hover:text-[#0284c7] dark:hover:text-[#4fc3f7] font-medium transition-colors"
                  >
                    {effectiveIndustry}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <a
                  href={getRouteUrl(`/group/${slugify(activeProduct.category)}`)}
                  onClick={(e) => handleLinkClick(e, `/group/${slugify(activeProduct.category)}`)}
                  className="hover:text-[#0284c7] dark:hover:text-[#4fc3f7] font-medium transition-colors"
                >
                  {activeProduct.category}
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-bold text-slate-900 dark:text-white line-clamp-1 max-w-[200px] sm:max-w-xs">{activeProduct.name}</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-3xl border p-5 sm:p-8 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-sky-100'
        }`}>
          <div>
            <div className="relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 sm:min-h-[30rem]">
              {activeProductImages.length > 0 ? (
                <>
                  <img
                    src={getHighResolutionProductImage(activeProductImages[selectedImageIndex] || activeProductImages[0])}
                    alt={`${activeProduct.name}${activeProductImages.length > 1 ? ` image ${selectedImageIndex + 1}` : ''}`}
                    className="h-full min-h-[22rem] w-full object-contain p-5 sm:min-h-[30rem] sm:p-8"
                    onError={(event) => {
                      event.currentTarget.classList.add('hidden');
                      const fallback = event.currentTarget.nextElementSibling;
                      fallback?.classList.remove('hidden');
                      fallback?.classList.add('flex');
                    }}
                  />
                  <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-sky-100 via-white to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-700">
                    <Package className="h-20 w-20 text-[#0284c7]/60 dark:text-[#4fc3f7]/60" aria-hidden="true" />
                  </div>
                </>
              ) : (
                <div className="flex min-h-[22rem] h-full w-full items-center justify-center bg-gradient-to-br from-sky-100 via-white to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-700 sm:min-h-[30rem]">
                  <Package className="h-20 w-20 text-[#0284c7]/60 dark:text-[#4fc3f7]/60" aria-hidden="true" />
                </div>
              )}
              {activeProduct.imageIsRepresentative && (
                <span className="absolute bottom-3 left-3 rounded bg-black/70 px-2.5 py-1.5 text-[10px] font-semibold text-white">
                  Representative 3M product-category image
                </span>
              )}
            </div>
            {activeProductImages.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {activeProductImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={selectedImageIndex === index}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-white p-1 ${
                      selectedImageIndex === index
                        ? 'border-[#0284c7]'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <img
                      src={getHighResolutionProductImage(image)}
                      alt=""
                      className="h-full w-full object-contain"
                      loading="lazy"
                      onError={(event) => event.currentTarget.closest('button')?.classList.add('hidden')}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => navigateTo(`/brand/${encodeURIComponent(activeProduct.brand)}`)}
                className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-[#0284c7] hover:bg-sky-200 dark:bg-sky-950 dark:text-[#4fc3f7]"
              >
                {activeProduct.brand}
              </button>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {activeProduct.category}
              </span>
            </div>

            <p className="mt-4 text-sm font-semibold text-[#0284c7] dark:text-[#4fc3f7]">{activeProduct.line}</p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">{activeProduct.name}</h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{activeProduct.description}</p>
            <div className="mt-4 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
              <p className="rounded-lg bg-slate-100 px-3 py-2 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Product ID: <span className="font-mono font-bold text-slate-900 dark:text-white">{activeProduct.id}</span>
              </p>
              <p className="rounded-lg bg-slate-100 px-3 py-2 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Product code / model: <span className="font-semibold text-slate-900 dark:text-white">{activeProduct.model}</span>
              </p>
            </div>

            <div className="mt-6">
              <label htmlFor="product-variant" className="mb-2 block text-sm font-bold text-slate-900 dark:text-white">
                Select available type / size
              </label>
              <select
                id="product-variant"
                value={selectedVariant}
                onChange={(event) => setSelectedVariant(event.target.value)}
                className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                {activeProduct.packOptions?.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Product options are based on 3M India listings where available. Confirm current stock, product code, and pack size before ordering.
              </p>
            </div>

            {activeProduct.colorOptions?.length > 0 && (
              <div className="mt-5">
                <label htmlFor="product-color" className="mb-2 flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
                  <span className="flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-[#0284c7] dark:text-[#4fc3f7]" />
                    Select colour / finish option
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7]">
                    {activeProduct.colorOptions.length} available
                  </span>
                </label>
                <select
                  id="product-color"
                  value={selectedColor}
                  onChange={(event) => setSelectedColor(event.target.value)}
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  {activeProduct.colorOptions.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="mt-5 max-w-40">
              <label htmlFor="product-quantity" className="mb-2 block text-sm font-bold text-slate-900 dark:text-white">
                Quantity
              </label>
              <input
                id="product-quantity"
                type="number"
                min="1"
                value={detailQuantity}
                onChange={(event) => setDetailQuantity(event.target.value)}
                className={`w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0284c7] ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => toggleCartItem(activeProduct, selectedVariant, selectedColor, detailQuantity)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0284c7] px-5 py-3 text-sm font-bold text-white hover:bg-[#0369a1]"
              >
                {isInCart(activeProduct.id, selectedVariant, selectedColor) ? <Trash2 className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                {isInCart(activeProduct.id, selectedVariant, selectedColor) ? 'Remove this configuration from RFQ Cart' : 'Add to RFQ Cart'}
              </button>
              <button
                onClick={() => openSingleProductRfq({ ...activeProduct, packaging: selectedVariant, color: selectedColor, quantity: detailQuantity })}
                className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-5 py-3 text-sm font-bold text-[#0284c7] hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950/60 dark:text-[#4fc3f7]"
              >
                <Send className="h-4 w-4" /> Enquire
              </button>
            </div>

            <a href={activeProduct.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#0284c7] hover:underline dark:text-[#4fc3f7]">
              View manufacturer details on {activeProduct.brand} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className={`mt-8 rounded-2xl border p-5 sm:p-7 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Product details</h2>
          <dl className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3">
              <dt className="text-sm font-semibold text-slate-600 dark:text-slate-400">Product ID</dt>
              <dd className="font-mono text-sm text-slate-900 dark:text-white sm:col-span-2">{activeProduct.id}</dd>
            </div>
            {Object.entries(activeProduct.specifications).map(([label, value]) => (
              <div key={label} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3">
                <dt className="text-sm font-semibold text-slate-600 dark:text-slate-400">{label}</dt>
                <dd className="text-sm text-slate-900 dark:text-white sm:col-span-2">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </main>
      ) : (
      <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Medical category tabs with cart badges */}
        <div id="sectors" className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-2.5">
                <Layers className="w-7 h-7 text-[#0284c7] dark:text-[#4fc3f7]" />
                {searchIsActive
                  ? `Search Results for "${searchQuery.trim()}"`
                  : activeProductCategory?.name || (activeCategory ? `Products for ${activeCategory.name}` : page.type === 'brand' ? `${page.value} Products` : 'Industries Served')}
              </h2>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                {searchIsActive
                  ? 'Matching products from all product categories and brands.'
                  : activeProductCategory
                  ? `Browse the sub-products in this ${activeProductCategory.name} product line. Select one to view available types and sizes.`
                  : activeCategory
                  ? `Browse medical product cards for ${activeCategory.name}. Open a product line to view its sub-products.`
                  : page.type === 'brand'
                    ? `Choose a product category to browse products from ${page.value}.`
                    : 'Choose an industry to browse the medical product lines available for that sector.'}
              </p>
            </div>

            <div className="text-xs font-semibold text-slate-500">
              Showing <span className="font-bold text-[#0284c7] dark:text-[#4fc3f7]">
                {searchIsActive ? filteredProducts.length
                  : page.type === 'home' ? visibleIndustryCategories.length
                  : activeCategory || page.type === 'brand' ? visibleProductCategories.length
                    : filteredProducts.length}
              </span> {searchIsActive ? 'products'
                : page.type === 'home' ? 'industries'
                : activeCategory || page.type === 'brand' ? 'product lines'
                  : 'sub-products'}
            </div>
          </div>

          {/* Back button & Breadcrumbs placed RIGHT ABOVE THE FILTERS */}
          {(page.type !== 'home' || searchIsActive) && (
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 pb-2 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={handleGoBack}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md transition-all duration-200 group active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>
                  {page.type === 'group'
                    ? `Back to ${effectiveIndustry || 'All Categories'}`
                    : page.type === 'category'
                    ? 'Back to All Industries'
                    : page.type === 'brand'
                    ? 'Back to All Products'
                    : 'Back to All Industries'}
                </span>
              </button>

              {/* Breadcrumb Trail */}
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <li>
                    <a
                      href={getRouteUrl('/')}
                      onClick={(e) => handleLinkClick(e, '/', { scrollToSectors: true })}
                      className="hover:text-[#0284c7] dark:hover:text-[#4fc3f7] font-medium transition-colors"
                    >
                      All Industries
                    </a>
                  </li>
                  {effectiveIndustry && (
                    <li className="flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      {page.type === 'category' ? (
                        <span className="font-bold text-slate-900 dark:text-white">{effectiveIndustry}</span>
                      ) : (
                        <a
                          href={getRouteUrl(`/category/${slugify(effectiveIndustry)}`)}
                          onClick={(e) => handleLinkClick(e, `/category/${slugify(effectiveIndustry)}`, { scrollToSectors: true })}
                          className="hover:text-[#0284c7] dark:hover:text-[#4fc3f7] font-medium transition-colors"
                        >
                          {effectiveIndustry}
                        </a>
                      )}
                    </li>
                  )}
                  {activeProductCategory && (
                    <li className="flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-bold text-slate-900 dark:text-white">{activeProductCategory.name}</span>
                    </li>
                  )}
                  {page.type === 'brand' && (
                    <li className="flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-bold text-slate-900 dark:text-white">{page.value}</span>
                    </li>
                  )}
                </ol>
              </nav>
            </div>
          )}

          {/* Brand Filter Pills Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0284c7] dark:text-[#4fc3f7]" /> Brand:
              </span>
              {[
                { id: 'All', label: 'All Brands', count: brandCounts.all },
                { id: '3M', label: '3M', count: brandCounts['3M'] },
                { id: 'Raman & Weil', label: 'Raman & Weil', count: brandCounts['Raman & Weil'] }
              ].map((b) => {
                const isSelected = selectedBrand === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBrand(b.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                        : darkMode
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>{b.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {b.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedBrand !== 'All' && (
              <button
                type="button"
                onClick={() => setSelectedBrand('All')}
                className="text-xs font-semibold text-[#0284c7] dark:text-[#4fc3f7] hover:underline cursor-pointer"
              >
                Reset to All Brands
              </button>
            )}
          </div>

          {/* Category Tabs Scrollable on Mobile with Hover Effects */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
            <button
              onClick={() => navigateTo('/', { scrollToSectors: true })}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#0284c7] text-white shadow-md'
                  : darkMode
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>All Industries</span>
            </button>

            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const cartCountInCat = getCategoryCartCount(cat.name);
              const isSelected = selectedCategory === cat.name;

              return (
                <a
                  key={cat.name}
                  href={getRouteUrl(`/category/${slugify(cat.name)}`)}
                  onClick={(e) => handleLinkClick(e, `/category/${slugify(cat.name)}`, { scrollToSectors: true })}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0284c7] text-white shadow-md'
                      : darkMode
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.name}</span>
                  {cartCountInCat > 0 && (
                    <span className="bg-[#4fc3f7] text-slate-900 text-[10px] px-1.5 py-0.2 rounded-full font-bold animate-pulse">
                      {cartCountInCat} in cart
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Active Sub-Filter Badges (Brand, Product Category, Search) */}
          {(Boolean(activeProductCategory) || selectedBrand !== 'All' || Boolean(searchQuery)) && (
            <div className="flex items-center gap-2 pt-1 text-xs flex-wrap">
              <span className="text-slate-500 font-medium">Active filters:</span>
              {selectedBrand !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  Brand: {selectedBrand}
                  <button
                    onClick={() => {
                      setSelectedBrand('All');
                      if (page.type === 'brand') {
                        const target = effectiveIndustry ? `/category/${slugify(effectiveIndustry)}` : '/';
                        navigateTo(target);
                      }
                    }}
                    aria-label="Clear brand filter"
                  >
                    <X className="w-3 h-3 hover:text-red-500 cursor-pointer" />
                  </button>
                </span>
              )}
              {activeProductCategory && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  Category: {activeProductCategory.name}
                  <button
                    onClick={() => {
                      const target = effectiveIndustry ? `/category/${slugify(effectiveIndustry)}` : '/';
                      navigateTo(target);
                    }}
                    aria-label="Clear product category filter"
                  >
                    <X className="w-3 h-3 hover:text-red-500 cursor-pointer" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} aria-label="Clear search filter">
                    <X className="w-3 h-3 hover:text-red-500 cursor-pointer" />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedBrand('All');
                  setSearchQuery('');
                  if (page.type === 'group' || page.type === 'brand') {
                    const target = effectiveIndustry ? `/category/${slugify(effectiveIndustry)}` : '/';
                    navigateTo(target);
                  }
                }}
                className="text-[#0284c7] dark:text-[#4fc3f7] font-semibold hover:underline ml-2 cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* ========================================================
            4-COLUMN RESPONSIVE PRODUCT GRID WITH RICH HOVER EFFECTS
           ======================================================== */}
        {filteredProducts.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Medical Products Matched Your Criteria</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
              We couldn't find products matching "{searchQuery}". Try a product name, brand (such as 3M), product category, model, or listed size.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBrand('All');
                if (page.type === 'group' || page.type === 'brand') {
                  const target = effectiveIndustry ? `/category/${slugify(effectiveIndustry)}` : '/';
                  navigateTo(target);
                }
              }}
              className="mt-5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#0284c7] text-white hover:bg-[#0369a1] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : page.type === 'home' && !searchIsActive ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleIndustryCategories.map((category) => {
              const Icon = category.icon;
              const groupCount = PRODUCT_CATEGORIES.filter(productCategory =>
                category.productCategories.includes(productCategory.name) &&
                filteredProducts.some(product => product.category === productCategory.name)
              ).length;

              return (
                <a
                  key={category.name}
                  href={getRouteUrl(`/category/${slugify(category.name)}`)}
                  onClick={(e) => handleLinkClick(e, `/category/${slugify(category.name)}`, { scrollToSectors: true })}
                  className={`group rounded-2xl border p-6 text-left transition-all hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl dark:hover:border-sky-700 block cursor-pointer ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-sky-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-[#0284c7] dark:bg-sky-950 dark:text-[#4fc3f7]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {groupCount} product lines
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-950 group-hover:text-[#0284c7] dark:text-white dark:group-hover:text-[#4fc3f7]">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Browse medical and healthcare products available to {category.name.toLowerCase()} through Maruti Chemicals.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#0284c7] dark:text-[#4fc3f7]">
                    Browse products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              );
            })}
          </div>
        ) : (activeCategory || page.type === 'brand') && !searchIsActive ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {visibleProductCategories.map((productCategory) => {
              const Icon = productCategory.icon;
              const categoryProducts = filteredProducts.filter(product => product.category === productCategory.name);
              const imageProduct = categoryProducts.find(product => product.image);

              return (
                <a
                  key={productCategory.name}
                  href={getRouteUrl(`/group/${slugify(productCategory.name)}`)}
                  onClick={(e) => handleLinkClick(e, `/group/${slugify(productCategory.name)}`, { scrollToSectors: true })}
                  className={`group overflow-hidden rounded-2xl border text-left transition-all hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl dark:hover:border-sky-700 block ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-sky-100'
                  }`}
                >
                  <div className="relative flex h-44 items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {imageProduct ? (
                      <>
                        <img
                          src={getHighResolutionProductImage(imageProduct.image)}
                          alt={productCategory.name}
                          className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.classList.add('hidden');
                            const fallback = event.currentTarget.nextElementSibling;
                            fallback?.classList.remove('hidden');
                            fallback?.classList.add('flex');
                          }}
                        />
                        <Icon className="hidden h-16 w-16 text-[#0284c7]/60 dark:text-[#4fc3f7]/60" />
                      </>
                    ) : (
                      <Icon className="h-16 w-16 text-[#0284c7]/60 dark:text-[#4fc3f7]/60" />
                    )}
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:bg-slate-900/90 dark:text-slate-200">
                      {categoryProducts.length} sub-products
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-[#0284c7] dark:text-[#4fc3f7]">
                      {[...new Set(categoryProducts.map(p => p.brand))].join(' · ') || 'Medical'} · Product line
                    </p>
                    <h3 className="mt-1 text-base font-bold text-slate-950 group-hover:text-[#0284c7] dark:text-white dark:group-hover:text-[#4fc3f7]">
                      {productCategory.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {categoryProducts.map(product => product.name).join(' · ')}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#0284c7] dark:text-[#4fc3f7]">
                      View sub-products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inCart = isInCart(product.id);

              return (
                <div
                  key={product.id}
                  className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-sky-300 dark:hover:border-sky-700 ${
                    inCart
                      ? 'ring-2 ring-[#0284c7] shadow-lg dark:ring-[#4fc3f7]'
                      : 'hover:shadow-xl'
                  } ${
                    darkMode
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-sky-100'
                  }`}
                >
                  {/* In Cart Top-Right Badge */}
                  {inCart && (
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-md bg-emerald-600 text-white animate-fade-in">
                      <Check className="w-3.5 h-3.5" /> Added to RFQ
                    </div>
                  )}

                  {/* Top Image Container with Zoom Effect */}
                  <a
                    href={getRouteUrl(`/product/${product.id}`)}
                    onClick={(e) => handleLinkClick(e, `/product/${product.id}`, { scrollToSectors: true })}
                    className="block relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer"
                  >
                    {product.image ? (
                      <>
                        <img
                          src={getHighResolutionProductImage(product.image)}
                          alt={product.name}
                          className="w-full h-full object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.classList.add('hidden');
                            const fallback = event.currentTarget.nextElementSibling;
                            fallback?.classList.remove('hidden');
                            fallback?.classList.add('flex');
                          }}
                        />
                        <div className="hidden h-full items-center justify-center bg-gradient-to-br from-sky-100 via-white to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-700">
                          <Package className="w-16 h-16 text-[#0284c7]/60 dark:text-[#4fc3f7]/60" aria-hidden="true" />
                        </div>
                      </>
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-sky-100 via-white to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-700">
                        <Package className="w-16 h-16 text-[#0284c7]/60 dark:text-[#4fc3f7]/60" aria-hidden="true" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                    {/* Sector pill overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="px-2.5 py-0.5 rounded-md font-medium backdrop-blur-md bg-slate-900/70 border border-white/10 truncate max-w-[170px]">
                        {product.category}
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/70 text-[#4fc3f7] font-semibold">
                        ID: {product.id}
                      </span>
                    </div>
                    {product.imageIsRepresentative && (
                      <span className="absolute left-3 top-3 rounded bg-black/65 px-2 py-1 text-[9px] font-semibold text-white">
                        Representative category image
                      </span>
                    )}
                  </a>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <a
                      href={getRouteUrl(`/product/${product.id}`)}
                      onClick={(e) => handleLinkClick(e, `/product/${product.id}`, { scrollToSectors: true })}
                      className="block text-left font-bold text-base text-slate-950 dark:text-white line-clamp-1 group-hover:text-[#0284c7] dark:group-hover:text-[#4fc3f7] transition-colors"
                    >
                      {product.name}
                    </a>

                    {/* Brand and product-family metadata */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
                      <button
                        onClick={() => navigateTo(`/brand/${encodeURIComponent(product.brand)}`, { scrollToSectors: true })}
                        className="font-mono px-2 py-0.5 rounded font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-400 cursor-pointer"
                        aria-label={`View all ${product.brand} products`}
                      >
                        {product.brand}
                      </button>
                      <span className="px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] border border-sky-100 dark:border-sky-900 truncate max-w-[140px] font-medium">
                        {product.line}
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <p className="mt-2 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                      Product code / model: {product.model}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {product.applications.slice(0, 2).map((app, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400"
                        >
                          • {app}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Package className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">Type / size: <strong className="text-slate-700 dark:text-slate-300 font-medium">{product.packaging}</strong></span>
                      </span>
                      {product.colorOptions?.length > 0 && (
                        <span className="flex items-center gap-1.5 text-sky-600 dark:text-[#4fc3f7] font-semibold text-[11px] mt-0.5">
                          <Palette className="w-3.5 h-3.5 shrink-0" />
                          <span>{product.colorOptions.length} Colours / Finishes available</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions: Spec, Enquire, Add/Remove Cart with Hover Lift */}
                  <div className="p-4 pt-0 flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={getRouteUrl(`/product/${product.id}`)}
                        onClick={(e) => handleLinkClick(e, `/product/${product.id}`)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                          darkMode
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5 text-[#0284c7] dark:text-[#4fc3f7]" /> Types & Sizes
                      </a>
                      <a
                        href={getRouteUrl(`/product/${product.id}`)}
                        onClick={(e) => handleLinkClick(e, `/product/${product.id}`)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                          darkMode
                            ? 'bg-sky-950/60 hover:bg-sky-900/60 text-[#4fc3f7] border border-sky-800'
                            : 'bg-sky-50 hover:bg-sky-100 text-[#0284c7] border border-sky-200'
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" /> Enquire
                      </a>
                    </div>

                    <a
                      href={getRouteUrl(`/product/${product.id}`)}
                      onClick={(e) => handleLinkClick(e, `/product/${product.id}`)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-md hover:brightness-105 active:scale-95 ${
                        inCart
                          ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                          : 'bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm'
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Choose a size
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" /> Select a size
                        </>
                      )}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      )}

      {page.type === 'home' && (
      <>
      {/* ========================================================
          4. OUR PROCESS: 7-STEP WORKFLOW (#process)
         ======================================================== */}
      <section id="process" className={`py-16 sm:py-24 border-t transition-colors duration-200 ${
        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-gradient-to-b from-[#faf9f6] via-white to-sky-50/40 border-sky-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] border border-sky-200 dark:border-sky-800">
              <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse"></span>
              OUR PROCESS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              From requirement to <span className="text-[#0284c7] dark:text-[#4fc3f7]">reliable delivery</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A transparent, seven-step workflow designed around your compliance and timelines.
            </p>
          </div>

          {/* Staggered Vertical Timeline Workflow with Rich Hover Effects */}
          <div className="max-w-3xl mx-auto relative">
            {/* Center/Left connecting vertical line */}
            <div className="absolute left-6 sm:left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#0284c7] via-[#4fc3f7] to-slate-200 dark:to-slate-800 -z-0"></div>

            <div className="space-y-5 relative z-10">
              {PROCESS_STEPS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="flex items-start gap-4 sm:gap-6 group"
                  >
                    {/* Step Number Circle / Badge */}
                    <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center font-mono font-black text-sm sm:text-base shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-sky-500/30 bg-slate-950 text-white dark:bg-slate-800 dark:text-[#4fc3f7] border-2 border-slate-800 dark:border-sky-500/40 group-hover:bg-[#0284c7] group-hover:border-[#0284c7]">
                      <span>{item.step}</span>
                      <Icon className="w-3.5 h-3.5 mt-0.5 opacity-80 group-hover:opacity-100" />
                    </div>

                    {/* Step Description Card with Hover Elevation */}
                    <div className={`flex-1 p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer ${
                      darkMode
                        ? 'bg-slate-900 border-slate-800'
                        : 'bg-white border-slate-200 shadow-xs hover:shadow-md'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                        <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white group-hover:text-[#0284c7] dark:group-hover:text-[#4fc3f7] transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full w-fit">
                          Step {idx + 1} of 7
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. OUR PRINCIPALS & REGULATORY CREDENTIALS (#principals)
         ======================================================== */}
      <section id="principals" className={`py-16 sm:py-20 border-t transition-colors duration-200 ${
        darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-sky-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Part A: 3M catalog */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] border border-sky-200 dark:border-sky-800">
              OUR PRINCIPALS & BRANDS
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
              Maruti Chemicals <span className="text-[#0284c7] dark:text-[#4fc3f7]">principals & brands</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Maruti Chemicals supplies products across pharmaceutical, industrial, and healthcare sectors. The clinical and healthcare listings in this catalog are from trusted partner manufacturers including 3M and Raman & Weil.
            </p>
          </div>

          {/* Manufacturer brand links */}
          <div className="grid grid-cols-2 max-w-xl mx-auto mb-16 gap-4">
            {PRINCIPAL_BRANDS.map((brand) => (
              <button
                key={brand}
                onClick={() => navigateTo(`/brand/${encodeURIComponent(brand)}`)}
                className={`p-4 rounded-xl border flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-sky-400 dark:hover:border-sky-600 cursor-pointer group ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-200 hover:text-white'
                    : 'bg-slate-50/80 border-slate-200 text-slate-800 hover:text-[#0284c7] hover:bg-white shadow-xs'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#0284c7] dark:text-[#4fc3f7] group-hover:scale-110 transition-transform" />
                <span className="font-bold text-xs sm:text-sm tracking-wide">{brand}</span>
              </button>
            ))}
          </div>

          {/* Part B: catalog guidance */}
          <div className="pt-10 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">
                PRODUCT CATALOG
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Product references & enquiry guidance
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {CREDENTIALS.map((cred) => {
                const Icon = cred.icon;
                return (
                  <div
                    key={cred.title}
                    className={`p-6 rounded-2xl border text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer group ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#faf9f6] border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-black text-sm sm:text-base text-slate-950 dark:text-white mb-1.5">
                      {cred.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {cred.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          6. PRODUCT INFORMATION (#specs-info)
         ======================================================== */}
      <section id="specs-info" className={`py-14 border-t ${
        darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-sky-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7] dark:text-[#4fc3f7]">
              PRODUCT INFORMATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white mt-1">
              Product Details & Availability
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Maruti Chemicals provides product information and enquiry support. Follow the manufacturer references shown on individual product pages to verify specifications, codes, and current availability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer group ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#faf9f6] border-slate-200'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300 shadow-sm">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">Manufacturer References</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Use the 3M India product reference linked from each catalog entry to check current product information.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer group ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#faf9f6] border-slate-200'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300 shadow-sm">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">Product Variants</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Select a listed type or size on a product page. Confirm any additional pack options with 3M.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300 dark:hover:border-sky-700 cursor-pointer group ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#faf9f6] border-slate-200'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7] dark:text-[#4fc3f7] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300 shadow-sm">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">Availability Confirmation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Confirm product code, system compatibility, regional availability, and fulfilment details before ordering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. DIRECT PROCUREMENT & CONTACT SECTION (#contact)
         ======================================================== */}
      <section id="contact" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#0284c7] dark:text-[#4fc3f7]">
                <span className="w-6 h-0.5 bg-[#0284c7] dark:bg-[#4fc3f7]"></span>
                CONTACT PROCUREMENT DESK
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                Connect Directly with Maruti Chemicals
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Contact us with the product name, brand, selected size, and quantity to request current availability and quotation details.
              </p>

              <div className="space-y-4 pt-2 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950 text-[#0284c7] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Commercial Office & Facility</div>
                    <div className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      Pankaj Gupta, II-C/199, Nehru Nagar, Ghaziabad (U.P.) — 201001, India
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950 text-[#0284c7] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Direct Calling & WhatsApp</div>
                    <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                      +91 98102 65053 · 0120-4557740
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950 text-[#0284c7] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Official Correspondence</div>
                    <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                      maruti_chemicals@yahoo.com
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950 text-[#0284c7] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Working Hours</div>
                    <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                      Monday – Saturday · 9:00 AM – 6:00 PM (IST)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Instant Inquiry Form */}
            <div className="lg:col-span-7">
              <div className={`p-8 rounded-3xl border shadow-sm ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Submit Direct Commercial Inquiry
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  Our commercial team will review your requirement and dispatch pricing details within 4 hours.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const genRef = `MC-RFQ-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
                    setRfqSuccessRef(genRef);
                    setIsRfqModalOpen(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Contact Person <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.fullName}
                        onChange={(e) => setRfqForm({ ...rfqForm, fullName: e.target.value })}
                        placeholder="Your Name"
                        className={`w-full px-3.5 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-[#0284c7] ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Company Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.companyName}
                        onChange={(e) => setRfqForm({ ...rfqForm, companyName: e.target.value })}
                        placeholder="Company Ltd."
                        className={`w-full px-3.5 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-[#0284c7] ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={rfqForm.email}
                        onChange={(e) => setRfqForm({ ...rfqForm, email: e.target.value })}
                        placeholder="procurement@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-[#0284c7] ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Phone / WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={rfqForm.phone}
                        onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })}
                        placeholder="+91 98102 XXXXX"
                        className={`w-full px-3.5 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-[#0284c7] ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Medical Products & Requested Quantity
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={rfqForm.instructions}
                      onChange={(e) => setRfqForm({ ...rfqForm, instructions: e.target.value })}
                      placeholder="List the 3M product name or model, size, quantity, and delivery destination..."
                      className={`w-full p-3.5 rounded-xl border outline-none focus:ring-2 focus:ring-[#0284c7] ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                      }`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#0284c7] hover:bg-[#0369a1] hover:shadow-xl hover:shadow-sky-500/25 hover:-translate-y-0.5 active:translate-y-0 text-white shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Commercial RFQ</span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
      </>
      )}

      {/* ========================================================
          6. FLOATING BOTTOM RFQ BAR
         ======================================================== */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-30 animate-bounce-slow">
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl bg-gradient-to-r from-[#0284c7] to-[#4fc3f7] text-slate-950 font-bold text-xs hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 text-slate-950" />
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-slate-950 text-white text-[10px] font-black flex items-center justify-center">
                {cart.length}
              </span>
            </div>
            <span>View RFQ & Checkout ({cart.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================
          7. SLIDEOUT RFQ CART DRAWER
         ======================================================== */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartDrawerOpen(false)}
          ></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className={`w-screen max-w-md shadow-2xl flex flex-col justify-between ${
              darkMode ? 'bg-slate-900 text-slate-100 border-l border-slate-800' : 'bg-white text-slate-900 border-l border-slate-200'
            }`}>
              
              {/* Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-950 text-[#0284c7]">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">Commercial RFQ Cart</h3>
                    <p className="text-xs text-slate-500">
                      {cart.length} medical product{cart.length !== 1 ? 's' : ''} in enquiry list
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                    <ShoppingCart className="w-10 h-10 mb-2 stroke-[1.5] text-slate-300 dark:text-slate-700" />
                    <p className="font-medium text-xs text-slate-600 dark:text-slate-400">Your RFQ cart is empty</p>
                    <p className="text-[11px] text-slate-400 mt-1">Browse the 3M catalog and add selected product sizes to request a quote.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className={`p-4 rounded-xl border flex flex-col gap-3 ${
                        darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-[#faf9f6] border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-slate-500">
                            <span>{item.product.brand}</span>
                            <span>•</span>
                            <span className="text-[#0284c7] dark:text-[#4fc3f7] font-semibold">{item.product.line}</span>
                          </div>
                          {item.color && (
                            <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-sky-600 dark:text-[#4fc3f7]">
                              <Palette className="w-3 h-3 shrink-0" />
                              <span className="truncate max-w-[240px]">{item.color}</span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeCartItem(item.cartItemId)}
                          className="text-slate-400 hover:text-rose-500 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="block text-[10px] font-medium text-slate-500 mb-1">
                            Target Quantity
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateCartItemQuantity(item.cartItemId, e.target.value)}
                            placeholder="Quantity"
                            className={`w-full px-2.5 py-1.5 rounded-lg border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                              darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-medium text-slate-500 mb-1">
                            Packaging / Size
                          </label>
                          <select
                            value={item.packaging}
                            onChange={(e) => updateCartItemPackaging(item.cartItemId, e.target.value)}
                            className={`w-full px-2.5 py-1.5 rounded-lg border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                              darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                            }`}
                          >
                            {item.product.packOptions?.map((opt, oIdx) => (
                              <option key={oIdx} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        {item.product.colorOptions?.length > 0 && (
                          <div className="col-span-2">
                            <label className="block text-[10px] font-medium text-slate-500 mb-1">
                              Colour / Finish Option
                            </label>
                            <select
                              value={item.color || item.product.colorOptions[0]}
                              onChange={(e) => updateCartItemColor(item.cartItemId, e.target.value)}
                              className={`w-full px-2.5 py-1.5 rounded-lg border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                                darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                              }`}
                            >
                              {item.product.colorOptions.map((col, cIdx) => (
                                <option key={cIdx} value={col}>
                                  {col}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
                  <button
                    onClick={openBatchCartRfq}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-[#0284c7] to-[#4fc3f7] text-slate-950 shadow-md hover:brightness-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Request Quotation for All ({cart.length}) Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full py-1 text-xs text-slate-400 hover:text-rose-500 text-center"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          8. TECHNICAL SPECIFICATIONS MODAL
         ======================================================== */}
      {activeSpecProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setActiveSpecProduct(null)}></div>

          <div className={`relative max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden border z-10 flex flex-col max-h-[90vh] ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="relative h-44 w-full overflow-hidden bg-slate-900">
              <img
                src={getHighResolutionProductImage(activeSpecProduct.image)}
                alt={activeSpecProduct.name}
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80'; }}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

              <button
                onClick={() => setActiveSpecProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#4fc3f7] text-slate-950">
                  {activeSpecProduct.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1 leading-tight">
                  {activeSpecProduct.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs font-mono text-sky-200">
                  <span>{activeSpecProduct.brand}</span>
                  <span>•</span>
                  <span>{activeSpecProduct.line}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Overview</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeSpecProduct.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Product Types, Sizes & Details
                </h4>
                <div className="rounded-xl border overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className={darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}>
                      <tr>
                        <th className="py-2 px-3 font-semibold border-b border-slate-200 dark:border-slate-700">Test Parameter</th>
                        <th className="py-2 px-3 font-semibold border-b border-slate-200 dark:border-slate-700">Monograph Standard</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {Object.entries(activeSpecProduct.specifications).map(([key, val], idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? (darkMode ? 'bg-slate-900/40' : 'bg-white') : (darkMode ? 'bg-slate-800/20' : 'bg-slate-50/60')}>
                          <td className="py-2 px-3 font-medium text-slate-600 dark:text-slate-400">{key}</td>
                          <td className="py-2 px-3 font-mono font-semibold text-slate-900 dark:text-white">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Applications</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {activeSpecProduct.applications.map((app, aIdx) => (
                    <div key={aIdx} className="p-2 rounded-xl border flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="text-slate-700 dark:text-slate-200">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900">
              <button
                onClick={() => toggleCartItem(activeSpecProduct)}
                className={`py-2 px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                  isInCart(activeSpecProduct.id)
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                    : 'bg-[#4fc3f7] text-slate-900 hover:bg-[#38bdf8]'
                }`}
              >
                {isInCart(activeSpecProduct.id) ? (
                  <>
                    <Trash2 className="w-3.5 h-3.5" /> Remove from RFQ
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" /> Add to RFQ Cart
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveSpecProduct(null);
                  openSingleProductRfq(activeSpecProduct);
                }}
                className="py-2 px-4 rounded-xl font-bold text-xs bg-[#0284c7] hover:bg-[#0369a1] text-white flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Instant Quotation</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          9. UNIFIED COMMERCIAL RFQ CHECKOUT MODAL
         ======================================================== */}
      {isRfqModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => !rfqSuccessRef && setIsRfqModalOpen(false)}></div>

          <div className={`relative max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden border z-10 flex flex-col max-h-[92vh] ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7] dark:text-[#4fc3f7]">
                  MARUTI CHEMICALS COMMERCIAL DESK
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {rfqTargetProduct ? `Request Quotation: ${rfqTargetProduct.name}` : `Multi-Product RFQ Engine (${cart.length} Items)`}
                </h3>
              </div>
              <button
                onClick={() => setIsRfqModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {rfqSuccessRef ? (
              <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Quotation Request Dispatched!
                </h4>

                <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 text-xs max-w-md w-full">
                  <div className="text-slate-500 mb-1">Your RFQ Reference Code:</div>
                  <div className="text-lg font-mono font-black text-[#0284c7] dark:text-[#4fc3f7]">
                    {rfqSuccessRef}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                  Thank you for your product enquiry. Our procurement team will contact you at <strong className="text-slate-900 dark:text-white">{rfqForm.email || 'your email'}</strong> to confirm product availability and quotation details.
                </p>

                <div className="pt-2">
                  <button
                    onClick={closeRfqSuccess}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#0284c7] text-white hover:bg-[#0369a1]"
                  >
                    Done & Return to Catalog
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRfqSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Medical Products in this Enquiry
                  </h4>
                  <div className="rounded-xl border divide-y overflow-hidden text-xs max-h-36 overflow-y-auto border-slate-200 dark:border-slate-800">
                    {rfqTargetProduct ? (
                      <div className="p-3 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{rfqTargetProduct.name}</div>
                          <div className="text-[11px] font-mono text-slate-500">{rfqTargetProduct.brand} · {rfqTargetProduct.line}</div>
                          {rfqTargetProduct.color && (
                            <div className="text-[11px] text-sky-600 dark:text-[#4fc3f7] font-semibold flex items-center gap-1 mt-0.5">
                              <Palette className="w-3 h-3" /> Colour: {rfqTargetProduct.color}
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-slate-600 dark:text-slate-300 text-right">{rfqTargetProduct.packaging}</span>
                      </div>
                    ) : (
                      cart.map(item => (
                        <div key={item.cartItemId} className="p-3 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white">{item.product.name}</span>
                            <span className="ml-2 font-mono text-slate-500">({item.quantity})</span>
                            {item.color && (
                              <div className="text-[11px] text-sky-600 dark:text-[#4fc3f7] font-semibold flex items-center gap-1 mt-0.5">
                                <Palette className="w-3 h-3" /> {item.color}
                              </div>
                            )}
                          </div>
                          <span className="font-medium text-slate-600 dark:text-slate-300 text-right">{item.packaging}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Corporate Procurement Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Contact Person Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.fullName}
                        onChange={(e) => setRfqForm({ ...rfqForm, fullName: e.target.value })}
                        placeholder="e.g. Rajesh Mehta"
                        className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Company Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.companyName}
                        onChange={(e) => setRfqForm({ ...rfqForm, companyName: e.target.value })}
                        placeholder="e.g. Apex Pharma Solutions Ltd."
                        className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Corporate Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={rfqForm.email}
                        onChange={(e) => setRfqForm({ ...rfqForm, email: e.target.value })}
                        placeholder="procurement@company.com"
                        className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Phone / WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={rfqForm.phone}
                        onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })}
                        placeholder="+91 98102 XXXXX"
                        className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Delivery City / Discharge Port <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rfqForm.destination}
                        onChange={(e) => setRfqForm({ ...rfqForm, destination: e.target.value })}
                        placeholder="e.g. Baddi / Delhi-NCR / Mumbai"
                        className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Commercial Terms
                      </label>
                      <select
                        value={rfqForm.incoterm}
                        onChange={(e) => setRfqForm({ ...rfqForm, incoterm: e.target.value })}
                        className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                          darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="Door Delivery (FOR Destination)">Door Delivery (FOR Destination)</option>
                        <option value="FOB India Port (Nhava Sheva / Mundra)">FOB India Port</option>
                        <option value="CIF Destination Port">CIF Destination Port</option>
                        <option value="Ex-Warehouse Ghaziabad">Ex-Warehouse Ghaziabad</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1 text-xs">
                      Custom Purity / Palletization / Special Instructions
                    </label>
                    <textarea
                      rows={2}
                      value={rfqForm.instructions}
                      onChange={(e) => setRfqForm({ ...rfqForm, instructions: e.target.value })}
                      placeholder="Specify requested assay limits, cleanroom bagging, wooden pallets, or required delivery date..."
                      className={`w-full p-2.5 rounded-xl border text-xs focus:ring-1 focus:ring-[#0284c7] outline-none ${
                        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#faf9f6] border-slate-300 text-slate-900'
                      }`}
                    ></textarea>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Valid Drug License & 4-Hour Proforma SLA</span>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-5 rounded-xl font-bold text-xs bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit RFQ</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          10. CORPORATE B2B FOOTER
         ======================================================== */}
      <footer className="bg-[#0b1723] text-slate-400 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-tr from-[#0284c7] to-[#4fc3f7] text-white shadow-sm">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div className="text-xl font-bold text-white">
                  MARUTI <span className="font-light text-[#4fc3f7]">CHEMICALS</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Maruti Chemicals is a premier manufacturer, distributor, and export enterprise delivering high-purity industrial, specialty, and pharmacopoeial chemicals across global trading destinations. Browse the listed medical products by industry and enquire about 3M and Raman & Weil product options.
              </p>
              <div className="text-xs text-slate-400">
                Director: <strong className="text-white">Pankaj Gupta</strong> · 10+ Years of Distribution Excellence
              </div>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Industries Served</h4>
              <ul className="space-y-2">
                {CATEGORIES.map(cat => (
                  <li key={cat.name}>
                    <a
                      href={getRouteUrl(`/category/${slugify(cat.name)}`)}
                      onClick={(e) => handleLinkClick(e, `/category/${slugify(cat.name)}`)}
                      className="hover:text-[#4fc3f7] transition"
                    >
                      {cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Corporate Desk</h4>
              <div className="space-y-2">
                <p>+91 98102 65053</p>
                <p>0120-4557740</p>
                <p>maruti_chemicals@yahoo.com</p>
                <p className="text-slate-400">
                  II-C/199, Nehru Nagar, Ghaziabad (U.P.) — 201001, India
                </p>
              </div>
            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-slate-800 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <p>© {new Date().getFullYear()} Maruti Chemicals. All Rights Reserved.</p>
            <p>Product information and images reference authorized manufacturers including 3M India and Raman & Weil.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
