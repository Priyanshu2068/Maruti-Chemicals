import React, { useRef, useEffect } from 'react';

/**
 * 3D Cartoon Automated Pharmaceutical Packaging Line Animation
 * - Upper conveyor belt completely removed as requested
 * - Moving lower conveyor belt carrying medical packaging boxes
 * - Cute Pixar-style articulated picking robot with expressive visor eyes & suction tool
 * - Robot picks up medical items (Syringes, 3M Tape Rolls, Medicine Bottles) from supply tray
 * - Robot inserts items directly into their respective boxes on the conveyor
 * - Boxes seal with closing flaps and security tape, then advance along the line
 * - 100% standard Canvas API (bulletproof drawRoundRect, no modern roundRect crash)
 * - 60 FPS smooth infinite loop
 */

export default function MedicalPackagingAnimation({ darkMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let startTime = null;

    const V_WIDTH = 960;
    const V_HEIGHT = 540;

    // Custom bulletproof rounded rectangle that works everywhere
    const roundRect = (c, x, y, w, h, r = 0) => {
      let radius = typeof r === 'number' ? r : 0;
      radius = Math.min(radius, Math.abs(w) / 2, Math.abs(h) / 2);
      c.beginPath();
      c.moveTo(x + radius, y);
      c.lineTo(x + w - radius, y);
      c.arcTo(x + w, y, x + w, y + radius, radius);
      c.arcTo(x + w, y + h, x + w - radius, y + h, radius);
      c.arcTo(x, y + h, x, y + h - radius, radius);
      c.arcTo(x, y, x + radius, y, radius);
      c.closePath();
    };

    const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const easeOutBack = (t) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    // 2-Link Inverse Kinematics for Robot Arm
    const solveIK = (targetX, targetY, shoulderX, shoulderY) => {
      const L1 = 115;
      const L2 = 105;
      const dx = targetX - shoulderX;
      const dy = targetY - shoulderY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const d = Math.max(20, Math.min(L1 + L2 - 2, dist));

      const baseAngle = Math.atan2(dy, dx);
      const cosA = (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d);
      const angleA = Math.acos(Math.max(-1, Math.min(1, cosA)));

      const shoulderAngle = baseAngle - angleA;
      const elbowX = shoulderX + L1 * Math.cos(shoulderAngle);
      const elbowY = shoulderY + L1 * Math.sin(shoulderAngle);

      return {
        shoulder: { x: shoulderX, y: shoulderY },
        elbow: { x: elbowX, y: elbowY },
        wrist: { x: targetX, y: targetY }
      };
    };

    const BOX_DEFS = [
      { id: 0, label: 'INJECTIONS', color: '#0284c7', lightColor: '#e0f2fe', icon: 'syringe' },
      { id: 1, label: 'MEDICAL TAPE', color: '#e11d48', lightColor: '#ffe4e6', icon: 'tape' },
      { id: 2, label: 'MEDICINES', color: '#0d9488', lightColor: '#ccfbf1', icon: 'bottle' }
    ];

    const CONVEYOR_Y = 410;
    const CONVEYOR_X = 60;
    const CONVEYOR_W = 840;
    const CONVEYOR_H = 46;

    const SUPPLY_TRAY_X = 250;
    const SUPPLY_TRAY_Y = 240;

    const PACK_STATION_X = 540;
    const PACK_STATION_Y = CONVEYOR_Y - 26;

    const ROBOT_BASE_X = 430;
    const ROBOT_BASE_Y = 270;

    const render = (timestamp) => {
      try {
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 1000;

        // Retina canvas scaling
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        if (canvas.width !== Math.floor(rect.width * dpr) || canvas.height !== Math.floor(rect.height * dpr)) {
          canvas.width = Math.floor(rect.width * dpr);
          canvas.height = Math.floor(rect.height * dpr);
        }

        ctx.save();
        ctx.scale(canvas.width / V_WIDTH, canvas.height / V_HEIGHT);
        ctx.clearRect(0, 0, V_WIDTH, V_HEIGHT);

        // 1. Draw Cleanroom Floor & Ambient Light
        drawBackground(ctx, V_WIDTH, V_HEIGHT, darkMode);

        // Timing: 3 products, 4.4 seconds each = 13.2s loop
        const CYCLE_DURATION = 4.4;
        const TOTAL_LOOP = CYCLE_DURATION * 3;
        const loopTime = elapsed % TOTAL_LOOP;
        const currentProductIndex = Math.floor(loopTime / CYCLE_DURATION);
        const cycleTime = loopTime % CYCLE_DURATION;
        const u = cycleTime / CYCLE_DURATION; // 0.0 to 1.0

        // Continuous belt motion offset
        const beltSpeed = 48;
        const beltOffset = (elapsed * beltSpeed) % 24;

        // 2. Supply Tray (Medical product dispenser on the left)
        drawSupplyTray(ctx, SUPPLY_TRAY_X, SUPPLY_TRAY_Y, darkMode);

        // 3. Draw Lower Moving Conveyor Belt
        drawConveyor(ctx, CONVEYOR_X, CONVEYOR_Y, CONVEYOR_W, CONVEYOR_H, beltOffset, darkMode);

        // Box positions on the moving conveyor
        // The active box glides from x = 320 to PACK_STATION_X (540), stops for packing, then glides to 760+
        let activeBoxX = PACK_STATION_X;
        let flapProgress = 0;
        let sealProgress = 0;
        let hasProductInside = false;

        if (u < 0.20) {
          // Box arriving into station
          const t = easeInOut(u / 0.20);
          activeBoxX = 300 + (PACK_STATION_X - 300) * t;
        } else if (u < 0.76) {
          // Box stationary at packaging dock receiving product
          activeBoxX = PACK_STATION_X;
          if (u >= 0.62) hasProductInside = true;
        } else if (u < 0.88) {
          // Flaps close & seal
          activeBoxX = PACK_STATION_X;
          hasProductInside = true;
          const flapT = (u - 0.76) / 0.12;
          flapProgress = easeInOut(flapT);
          if (u >= 0.82) {
            sealProgress = easeOutBack((u - 0.82) / 0.06);
          }
        } else {
          // Box sealed and glides forward out of station
          hasProductInside = true;
          flapProgress = 1;
          sealProgress = 1;
          const t = easeInOut((u - 0.88) / 0.12);
          activeBoxX = PACK_STATION_X + (780 - PACK_STATION_X) * t;
        }

        // Draw preceding box departing on the right (if space permits)
        if (u < 0.40) {
          const prevIndex = (currentProductIndex + 2) % 3;
          const prevBoxX = 760 + u * 250;
          if (prevBoxX < CONVEYOR_X + CONVEYOR_W - 50) {
            drawBox(ctx, prevBoxX, CONVEYOR_Y - 26, BOX_DEFS[prevIndex], 1, 1, true, darkMode);
          }
        }

        // Draw upcoming queued box arriving on the left
        if (u > 0.65) {
          const nextIndex = (currentProductIndex + 1) % 3;
          const t = (u - 0.65) / 0.35;
          const incomingBoxX = 140 + t * 160;
          drawBox(ctx, incomingBoxX, CONVEYOR_Y - 26, BOX_DEFS[nextIndex], 0, 0, false, darkMode);
        }

        // Draw the Active Box receiving the product
        drawBox(
          ctx,
          activeBoxX,
          CONVEYOR_Y - 26,
          BOX_DEFS[currentProductIndex],
          flapProgress,
          sealProgress,
          hasProductInside,
          darkMode
        );

        // Robot Arm Coordinates & Product Trajectory
        const PICKUP_X = SUPPLY_TRAY_X;
        const PICKUP_Y = SUPPLY_TRAY_Y - 14;
        const DROP_X = PACK_STATION_X;
        const DROP_Y = CONVEYOR_Y - 48;

        let armTargetX = ROBOT_BASE_X;
        let armTargetY = 160;
        let isHolding = false;
        let suctionCompressed = false;
        let eyeLookAngle = 0; // eye look direction (-1 = left/tray, 1 = right/box)
        let eyeExpression = 'normal'; // 'normal', 'squint', 'happy'
        let productVisibleInTray = true;

        if (u < 0.15) {
          // Arm moving toward supply tray
          const t = easeInOut(u / 0.15);
          armTargetX = ROBOT_BASE_X + (PICKUP_X - ROBOT_BASE_X) * t;
          armTargetY = 160 + (PICKUP_Y - 30 - 160) * t;
          eyeLookAngle = -0.8;
        } else if (u < 0.28) {
          // Lower suction tool onto product
          const t = easeInOut((u - 0.15) / 0.13);
          armTargetX = PICKUP_X;
          armTargetY = (PICKUP_Y - 30) + 30 * t;
          eyeLookAngle = -1;
          if (u >= 0.24) {
            suctionCompressed = true;
            isHolding = true;
            productVisibleInTray = false;
            eyeExpression = 'squint';
          }
        } else if (u < 0.36) {
          // Grab & initial lift
          suctionCompressed = true;
          isHolding = true;
          productVisibleInTray = false;
          const t = easeInOut((u - 0.28) / 0.08);
          armTargetX = PICKUP_X + (PICKUP_X + 20 - PICKUP_X) * t;
          armTargetY = PICKUP_Y - 45 * t;
          eyeLookAngle = -0.5;
        } else if (u < 0.60) {
          // Smooth parabolic transfer arc from tray to the box
          isHolding = true;
          productVisibleInTray = false;
          const t = easeInOut((u - 0.36) / 0.24);
          const arcHeight = 85;
          armTargetX = (PICKUP_X + 20) + (DROP_X - (PICKUP_X + 20)) * t;
          armTargetY = (PICKUP_Y - 45) + (DROP_Y - (PICKUP_Y - 45)) * t - Math.sin(t * Math.PI) * arcHeight;
          eyeLookAngle = -0.2 + t * 1.2; // eyes follow product to box
        } else if (u < 0.72) {
          // Lower product into box & release suction
          armTargetX = DROP_X;
          const t = (u - 0.60) / 0.12;
          armTargetY = DROP_Y + 12 * Math.sin(t * Math.PI);
          eyeLookAngle = 0.9;
          if (t < 0.5) {
            isHolding = true;
            productVisibleInTray = false;
          } else {
            isHolding = false;
            productVisibleInTray = false;
            eyeExpression = 'happy';
          }
        } else {
          // Return arm to ready pose
          isHolding = false;
          productVisibleInTray = false;
          const t = easeInOut((u - 0.72) / 0.28);
          armTargetX = DROP_X + (ROBOT_BASE_X - DROP_X) * t;
          armTargetY = DROP_Y + (160 - DROP_Y) * t;
          eyeLookAngle = 0.5 * (1 - t);
          eyeExpression = 'happy';
        }

        // Draw item waiting in supply tray
        if (productVisibleInTray) {
          drawProduct(ctx, currentProductIndex, SUPPLY_TRAY_X, SUPPLY_TRAY_Y - 10, 1);
        }

        // 4. Draw Cute Pixar-Style Picking Robot
        drawRobot(
          ctx,
          ROBOT_BASE_X,
          ROBOT_BASE_Y,
          armTargetX,
          armTargetY,
          suctionCompressed,
          isHolding,
          eyeLookAngle,
          eyeExpression,
          darkMode,
          elapsed
        );

        // 5. Draw Product being carried by the Robot Gripper
        if (isHolding) {
          drawProduct(ctx, currentProductIndex, armTargetX, armTargetY + 18, 1);
        }

        ctx.restore();
      } catch (err) {
        console.error('Packaging animation render error:', err);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };

    // --- Helper Drawing Functions ---

    function drawBackground(c, w, h, isDark) {
      // Soft radial ambient light behind the robot that gently fades out to 100% transparent at edges
      const grad = c.createRadialGradient(w * 0.52, h * 0.46, 50, w * 0.52, h * 0.48, w * 0.55);
      if (isDark) {
        grad.addColorStop(0, 'rgba(30, 41, 59, 0.45)');
        grad.addColorStop(0.6, 'rgba(15, 23, 42, 0.2)');
        grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      } else {
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
        grad.addColorStop(0.55, 'rgba(240, 249, 255, 0.35)');
        grad.addColorStop(1, 'rgba(240, 249, 255, 0)');
      }
      c.fillStyle = grad;
      c.fillRect(0, 0, w, h);

      // Soft ground ambient shadow under conveyor & robot base that dissolves into transparent
      const groundGrad = c.createRadialGradient(w * 0.52, h * 0.82, 50, w * 0.52, h * 0.82, w * 0.48);
      if (isDark) {
        groundGrad.addColorStop(0, 'rgba(2, 6, 23, 0.35)');
        groundGrad.addColorStop(1, 'rgba(2, 6, 23, 0)');
      } else {
        groundGrad.addColorStop(0, 'rgba(2, 132, 199, 0.07)');
        groundGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
      }
      c.fillStyle = groundGrad;
      c.fillRect(0, 320, w, h - 320);

      // Floor grid lines that softly fade out towards the edges
      c.save();
      for (let y = 330; y < h; y += 32) {
        const lineAlpha = (y - 320) / (h - 320);
        c.strokeStyle = isDark
          ? `rgba(56, 189, 248, ${0.05 * lineAlpha})`
          : `rgba(2, 132, 199, ${0.07 * lineAlpha})`;
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(80, y);
        c.lineTo(w - 60, y);
        c.stroke();
      }
      for (let x = 90; x < w - 40; x += 80) {
        c.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.04)' : 'rgba(2, 132, 199, 0.06)';
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(x - 30, h);
        c.lineTo(x + 20, 320);
        c.stroke();
      }
      c.restore();
    }

    function drawSupplyTray(c, x, y, isDark) {
      c.save();
      // Drop shadow
      c.fillStyle = isDark ? 'rgba(0,0,0,0.4)' : 'rgba(15,23,42,0.1)';
      c.beginPath();
      c.ellipse(x, y + 20, 52, 14, 0, 0, Math.PI * 2);
      c.fill();

      // Pedestal stand
      c.fillStyle = isDark ? '#334155' : '#cbd5e1';
      c.fillRect(x - 8, y + 2, 16, 18);

      // Dispenser tray plate
      const trayGrad = c.createLinearGradient(x - 45, y - 10, x + 45, y + 6);
      trayGrad.addColorStop(0, isDark ? '#1e293b' : '#f8fafc');
      trayGrad.addColorStop(1, isDark ? '#0f172a' : '#cbd5e1');
      c.fillStyle = trayGrad;
      c.strokeStyle = '#0284c7';
      c.lineWidth = 2;
      roundRect(c, x - 48, y - 10, 96, 16, 8);
      c.fill();
      c.stroke();

      // Green Ready LED
      c.fillStyle = '#22c55e';
      c.shadowColor = '#22c55e';
      c.shadowBlur = 6;
      c.beginPath();
      c.arc(x - 36, y - 2, 3, 0, Math.PI * 2);
      c.fill();
      c.shadowBlur = 0;

      // Label
      c.fillStyle = isDark ? '#94a3b8' : '#64748b';
      c.font = 'bold 8px Inter, sans-serif';
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText('SUPPLY FEED', x + 6, y - 2);

      c.restore();
    }

    function drawConveyor(c, x, y, w, h, offset, isDark) {
      c.save();
      // Drop shadow beneath conveyor
      c.fillStyle = isDark ? 'rgba(0, 0, 0, 0.45)' : 'rgba(15, 23, 42, 0.1)';
      c.beginPath();
      c.ellipse(x + w / 2, y + h + 10, w * 0.52, 14, 0, 0, Math.PI * 2);
      c.fill();

      // Aluminum Support Legs
      const legColor = isDark ? '#334155' : '#cbd5e1';
      const legX = [x + 50, x + w * 0.3, x + w * 0.5, x + w * 0.7, x + w - 50];
      legX.forEach((lx) => {
        c.fillStyle = legColor;
        c.fillRect(lx - 5, y + h - 6, 10, 36);
        c.fillStyle = isDark ? '#1e293b' : '#94a3b8';
        c.fillRect(lx - 9, y + h + 24, 18, 6);
      });

      // Conveyor chassis plate
      const chassisGrad = c.createLinearGradient(x, y, x, y + h);
      chassisGrad.addColorStop(0, isDark ? '#1e293b' : '#f8fafc');
      chassisGrad.addColorStop(0.5, isDark ? '#0f172a' : '#e2e8f0');
      chassisGrad.addColorStop(1, isDark ? '#020617' : '#cbd5e1');
      c.fillStyle = chassisGrad;
      c.strokeStyle = isDark ? '#334155' : '#cbd5e1';
      c.lineWidth = 1.5;
      roundRect(c, x, y, w, h, 10);
      c.fill();
      c.stroke();

      // Teal Accent Guide Stripe
      c.fillStyle = '#0d9488';
      c.fillRect(x + 12, y + h - 10, w - 24, 3.5);

      // Rubber conveyor belt track
      const beltY = y + 4;
      const beltH = h - 16;
      c.fillStyle = isDark ? '#0b1120' : '#334155';
      roundRect(c, x + 6, beltY, w - 12, beltH, 6);
      c.fill();

      // Moving rubber tread slats
      c.save();
      roundRect(c, x + 6, beltY, w - 12, beltH, 6);
      c.clip();
      c.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.22)' : 'rgba(255, 255, 255, 0.22)';
      c.lineWidth = 2.5;
      for (let bx = x - 20 + offset; bx < x + w + 20; bx += 24) {
        c.beginPath();
        c.moveTo(bx, beltY + 1);
        c.lineTo(bx + 8, beltY + beltH - 1);
        c.stroke();
      }
      c.restore();

      // Chrome end rollers
      [x + 10, x + w - 10].forEach((rx) => {
        c.fillStyle = isDark ? '#64748b' : '#94a3b8';
        c.beginPath();
        c.arc(rx, y + h / 2, 8, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = '#0284c7';
        c.beginPath();
        c.arc(rx, y + h / 2, 3, 0, Math.PI * 2);
        c.fill();
      });

      c.restore();
    }

    function drawBox(c, x, y, boxDef, flapProgress, sealProgress, hasProduct, isDark) {
      c.save();
      c.translate(x, y);

      const bw = 96;
      const bh = 58;

      // Box shadow
      c.fillStyle = isDark ? 'rgba(0,0,0,0.45)' : 'rgba(15,23,42,0.12)';
      c.beginPath();
      c.ellipse(0, bh * 0.5 + 4, bw * 0.52, 10, 0, 0, Math.PI * 2);
      c.fill();

      // Main box body
      const frontGrad = c.createLinearGradient(-bw / 2, 0, bw / 2, 0);
      frontGrad.addColorStop(0, isDark ? '#1e293b' : '#ffffff');
      frontGrad.addColorStop(0.7, isDark ? '#0f172a' : '#f8fafc');
      frontGrad.addColorStop(1, isDark ? '#090d16' : '#e2e8f0');
      c.fillStyle = frontGrad;
      c.strokeStyle = isDark ? '#334155' : '#cbd5e1';
      c.lineWidth = 1.8;
      roundRect(c, -bw / 2, -bh / 2, bw, bh, 6);
      c.fill();
      c.stroke();

      // Bottom colored band
      c.fillStyle = boxDef.color;
      roundRect(c, -bw / 2 + 1, bh / 2 - 8, bw - 2, 7, 3);
      c.fill();

      // Preview product inside box before flaps close
      if (hasProduct && flapProgress < 0.7) {
        c.save();
        c.globalAlpha = Math.max(0, 1 - flapProgress * 0.9);
        drawProduct(c, boxDef.id, 0, -bh / 2 + 6, 0.82);
        c.restore();
      }

      // Printed Header Label
      c.fillStyle = boxDef.lightColor;
      roundRect(c, -bw / 2 + 8, -bh / 2 + 8, bw - 16, 22, 4);
      c.fill();

      c.fillStyle = boxDef.color;
      c.font = 'bold 9.5px Inter, system-ui, sans-serif';
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(boxDef.label, 0, -bh / 2 + 19);

      // Subtitle & Barcode
      c.fillStyle = isDark ? '#94a3b8' : '#64748b';
      c.font = '600 7.5px "JetBrains Mono", monospace';
      c.fillText(`BOX-0${boxDef.id + 1} · QC PASSED`, 0, 5);

      c.fillStyle = isDark ? '#475569' : '#cbd5e1';
      for (let bx = -22; bx <= 22; bx += 3.5) {
        c.fillRect(bx, 13, 1.8, 8);
      }

      // Flaps (Folding action)
      const openAngle = Math.PI * 0.28 * (1 - flapProgress);
      const flapW = bw * 0.52;
      const flapH = 17;

      c.fillStyle = isDark ? '#334155' : '#e2e8f0';
      c.strokeStyle = isDark ? '#475569' : '#cbd5e1';
      c.lineWidth = 1.2;

      // Left flap
      c.save();
      c.translate(-bw / 2, -bh / 2);
      c.rotate(-openAngle);
      roundRect(c, 0, -flapH, flapW, flapH, 3);
      c.fill();
      c.stroke();
      c.restore();

      // Right flap
      c.save();
      c.translate(bw / 2, -bh / 2);
      c.rotate(openAngle);
      roundRect(c, -flapW, -flapH, flapW, flapH, 3);
      c.fill();
      c.stroke();
      c.restore();

      // Security Seal Tape
      if (sealProgress > 0.05) {
        c.save();
        const tapeW = bw * 0.65 * Math.min(1, sealProgress);
        c.fillStyle = boxDef.color;
        roundRect(c, -tapeW / 2, -bh / 2 - 3, tapeW, 6, 2);
        c.fill();

        if (sealProgress > 0.5) {
          c.fillStyle = '#22c55e';
          c.beginPath();
          c.arc(0, -bh / 2, 6.5, 0, Math.PI * 2);
          c.fill();
          c.strokeStyle = '#ffffff';
          c.lineWidth = 1.8;
          c.beginPath();
          c.moveTo(-2.5, -bh / 2);
          c.lineTo(-0.5, -bh / 2 + 2.5);
          c.lineTo(3, -bh / 2 - 2.5);
          c.stroke();
        }
        c.restore();
      }

      c.restore();
    }

    function drawProduct(c, type, x, y, scale = 1) {
      c.save();
      c.translate(x, y);
      c.scale(scale, scale);

      if (type === 0) {
        // Syringe Pack
        const bGrad = c.createLinearGradient(-18, -6, 18, 6);
        bGrad.addColorStop(0, '#ffffff');
        bGrad.addColorStop(0.5, '#e0f2fe');
        bGrad.addColorStop(1, '#bae6fd');
        c.fillStyle = bGrad;
        c.strokeStyle = '#0284c7';
        c.lineWidth = 1.5;
        roundRect(c, -20, -7, 34, 14, 4);
        c.fill();
        c.stroke();

        // Liquid medicine inside
        c.fillStyle = '#0284c7';
        roundRect(c, -18, -5, 20, 10, 2);
        c.fill();

        // Measurement ticks
        c.strokeStyle = '#ffffff';
        c.lineWidth = 1;
        for (let tx = -14; tx <= -2; tx += 4) {
          c.beginPath();
          c.moveTo(tx, -5);
          c.lineTo(tx, -2);
          c.stroke();
        }

        // Plunger
        c.fillStyle = '#f8fafc';
        c.fillRect(-28, -2.5, 9, 5);
        c.beginPath();
        c.ellipse(-29, 0, 2.5, 6, 0, 0, Math.PI * 2);
        c.fill();

        // Hub & Needle
        c.fillStyle = '#38bdf8';
        c.fillRect(14, -3.5, 8, 7);
        c.fillStyle = '#94a3b8';
        c.fillRect(22, -1.2, 10, 2.4);
      } else if (type === 1) {
        // 3M Medical Tape Roll
        const tGrad = c.createRadialGradient(-3, -3, 2, 0, 0, 18);
        tGrad.addColorStop(0, '#ffffff');
        tGrad.addColorStop(0.6, '#f1f5f9');
        tGrad.addColorStop(1, '#cbd5e1');
        c.fillStyle = tGrad;
        c.strokeStyle = '#94a3b8';
        c.lineWidth = 1.5;
        c.beginPath();
        c.arc(0, 0, 16, 0, Math.PI * 2);
        c.fill();
        c.stroke();

        // Red 3M core
        c.fillStyle = '#e11d48';
        c.beginPath();
        c.arc(0, 0, 8.5, 0, Math.PI * 2);
        c.fill();

        c.fillStyle = '#ffffff';
        c.beginPath();
        c.arc(0, 0, 4.5, 0, Math.PI * 2);
        c.fill();

        c.fillStyle = '#ffffff';
        c.font = 'bold 6px Inter, sans-serif';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText('3M', 0, 0);

        c.fillStyle = '#e2e8f0';
        c.fillRect(12, -14, 7, 5);
      } else {
        // Medicine Bottle
        const bGrad = c.createLinearGradient(-12, 0, 12, 0);
        bGrad.addColorStop(0, '#14b8a6');
        bGrad.addColorStop(0.5, '#0d9488');
        bGrad.addColorStop(1, '#042f2e');
        c.fillStyle = bGrad;
        c.strokeStyle = '#0f766e';
        c.lineWidth = 1.5;
        roundRect(c, -12, -12, 24, 28, 6);
        c.fill();
        c.stroke();

        // White Safety Cap
        c.fillStyle = '#f8fafc';
        c.strokeStyle = '#cbd5e1';
        c.lineWidth = 1;
        c.fillRect(-6, -18, 12, 6);
        c.fillRect(-7.5, -23, 15, 6);

        // White Label with Cross
        c.fillStyle = '#ffffff';
        roundRect(c, -10, -5, 20, 16, 3);
        c.fill();

        c.fillStyle = '#0d9488';
        c.fillRect(-2, -1, 4, 8);
        c.fillRect(-5, 1, 10, 4);
      }

      c.restore();
    }

    function drawRobot(
      c,
      baseX,
      baseY,
      targetX,
      targetY,
      suctionCompressed,
      isHolding,
      eyeLook,
      expression,
      isDark,
      elapsed
    ) {
      c.save();

      // 1. Robot Base Contact Shadow
      c.fillStyle = 'rgba(0, 0, 0, 0.25)';
      c.beginPath();
      c.ellipse(baseX, baseY + 18, 65, 18, 0, 0, Math.PI * 2);
      c.fill();

      // 2. Heavy-Duty Swivel Turntable Base
      const bGrad = c.createLinearGradient(baseX - 55, baseY, baseX + 55, baseY);
      bGrad.addColorStop(0, isDark ? '#1e293b' : '#f8fafc');
      bGrad.addColorStop(0.5, isDark ? '#334155' : '#ffffff');
      bGrad.addColorStop(1, isDark ? '#0f172a' : '#cbd5e1');
      c.fillStyle = bGrad;
      c.strokeStyle = '#0284c7';
      c.lineWidth = 2;
      roundRect(c, baseX - 55, baseY - 12, 110, 28, 12);
      c.fill();
      c.stroke();

      // Glowing Cyan Base LED Ring
      c.strokeStyle = '#00e5ff';
      c.lineWidth = 2.5;
      c.shadowColor = '#00e5ff';
      c.shadowBlur = 8;
      c.beginPath();
      c.ellipse(baseX, baseY + 1, 46, 12, 0, 0, Math.PI * 2);
      c.stroke();
      c.shadowBlur = 0;

      // 3. Robot Torso / Pod
      const torsoY = baseY - 55;
      const tGrad = c.createLinearGradient(baseX - 35, torsoY, baseX + 35, torsoY);
      tGrad.addColorStop(0, isDark ? '#0f172a' : '#ffffff');
      tGrad.addColorStop(0.5, isDark ? '#1e293b' : '#f0f9ff');
      tGrad.addColorStop(1, isDark ? '#020617' : '#cbd5e1');
      c.fillStyle = tGrad;
      c.strokeStyle = isDark ? '#38bdf8' : '#0284c7';
      c.lineWidth = 2.5;
      roundRect(c, baseX - 38, torsoY - 45, 76, 75, 20);
      c.fill();
      c.stroke();

      // 4. Cute Robot Visor Face & Eyes
      const headY = torsoY - 20;
      // Dark curved visor screen
      c.fillStyle = '#0f172a';
      c.strokeStyle = '#38bdf8';
      c.lineWidth = 1.8;
      roundRect(c, baseX - 28, headY - 18, 56, 32, 12);
      c.fill();
      c.stroke();

      // Expressive Cyan Glowing Eyes on Visor
      const eyeOffsetX = eyeLook * 7;
      const eyeY = headY - 2;
      c.fillStyle = '#00e5ff';
      c.shadowColor = '#00e5ff';
      c.shadowBlur = 10;

      if (expression === 'squint') {
        // Concentrated squint line eyes (^ ^)
        c.strokeStyle = '#00e5ff';
        c.lineWidth = 3;
        c.beginPath();
        c.arc(baseX - 12 + eyeOffsetX, eyeY, 6, Math.PI, 0);
        c.stroke();
        c.beginPath();
        c.arc(baseX + 12 + eyeOffsetX, eyeY, 6, Math.PI, 0);
        c.stroke();
      } else if (expression === 'happy') {
        // Happy inverted arc eyes (◠ ◠)
        c.strokeStyle = '#00e5ff';
        c.lineWidth = 3;
        c.beginPath();
        c.arc(baseX - 12 + eyeOffsetX, eyeY + 2, 6, Math.PI, 0);
        c.stroke();
        c.beginPath();
        c.arc(baseX + 12 + eyeOffsetX, eyeY + 2, 6, Math.PI, 0);
        c.stroke();
      } else {
        // Big round friendly eyes (• •)
        c.beginPath();
        c.ellipse(baseX - 12 + eyeOffsetX, eyeY, 5, 7, 0, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.ellipse(baseX + 12 + eyeOffsetX, eyeY, 5, 7, 0, 0, Math.PI * 2);
        c.fill();

        // Eye highlights
        c.fillStyle = '#ffffff';
        c.beginPath();
        c.arc(baseX - 14 + eyeOffsetX, eyeY - 2.5, 2, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.arc(baseX + 10 + eyeOffsetX, eyeY - 2.5, 2, 0, Math.PI * 2);
        c.fill();
      }
      c.shadowBlur = 0;

      // Antenna on Head
      c.fillStyle = isDark ? '#64748b' : '#94a3b8';
      c.fillRect(baseX - 2, headY - 32, 4, 14);
      c.fillStyle = '#38bdf8';
      c.shadowColor = '#38bdf8';
      c.shadowBlur = 6;
      c.beginPath();
      c.arc(baseX, headY - 33, 4.5, 0, Math.PI * 2);
      c.fill();
      c.shadowBlur = 0;

      // 5. Robot Articulated Arm (Attached to Right Shoulder)
      const shoulderX = baseX + 26;
      const shoulderY = torsoY - 10;

      const ik = solveIK(targetX, targetY, shoulderX, shoulderY);

      // Shoulder ball joint
      c.fillStyle = isDark ? '#1e293b' : '#0284c7';
      c.beginPath();
      c.arc(shoulderX, shoulderY, 14, 0, Math.PI * 2);
      c.fill();

      // Bicep Link
      drawBone(c, shoulderX, shoulderY, ik.elbow.x, ik.elbow.y, 16, 12, isDark, '#0284c7');

      // Elbow knuckle joint
      c.fillStyle = isDark ? '#0f172a' : '#ffffff';
      c.strokeStyle = '#0284c7';
      c.lineWidth = 2.5;
      c.beginPath();
      c.arc(ik.elbow.x, ik.elbow.y, 12, 0, Math.PI * 2);
      c.fill();
      c.stroke();

      // Forearm Link
      drawBone(c, ik.elbow.x, ik.elbow.y, ik.wrist.x, ik.wrist.y, 12, 9, isDark, isHolding ? '#10b981' : '#38bdf8');

      // Forearm LED status beacon
      const midX = (ik.elbow.x + ik.wrist.x) * 0.5;
      const midY = (ik.elbow.y + ik.wrist.y) * 0.5;
      c.fillStyle = isHolding ? '#22c55e' : '#00e5ff';
      c.shadowColor = isHolding ? '#22c55e' : '#00e5ff';
      c.shadowBlur = 8;
      c.beginPath();
      c.arc(midX, midY, 3.5, 0, Math.PI * 2);
      c.fill();
      c.shadowBlur = 0;

      // Wrist Collar & Suction Gripper Tool
      c.fillStyle = isDark ? '#334155' : '#cbd5e1';
      roundRect(c, ik.wrist.x - 9, ik.wrist.y - 5, 18, 9, 3);
      c.fill();

      // Piston rod
      c.fillStyle = '#f8fafc';
      c.fillRect(ik.wrist.x - 2.5, ik.wrist.y + 4, 5, 8);

      // Accordion Suction Cup
      const cupH = suctionCompressed ? 8 : 14;
      const cupW = suctionCompressed ? 18 : 14;
      const cupGrad = c.createLinearGradient(ik.wrist.x - 7, 0, ik.wrist.x + 7, 0);
      cupGrad.addColorStop(0, '#f97316');
      cupGrad.addColorStop(0.5, '#fb923c');
      cupGrad.addColorStop(1, '#c2410c');
      c.fillStyle = cupGrad;

      c.beginPath();
      c.ellipse(ik.wrist.x, ik.wrist.y + 12, cupW * 0.5, cupH * 0.4, 0, 0, Math.PI * 2);
      c.fill();
      c.beginPath();
      c.ellipse(ik.wrist.x, ik.wrist.y + 12 + cupH * 0.4, cupW * 0.65, cupH * 0.45, 0, 0, Math.PI * 2);
      c.fill();

      // Suction vacuum puff effect
      if (suctionCompressed && isHolding) {
        c.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        c.lineWidth = 1.5;
        c.beginPath();
        c.arc(ik.wrist.x, ik.wrist.y + 20, 10 + (elapsed * 20 % 6), 0, Math.PI * 2);
        c.stroke();
      }

      c.restore();
    }

    function drawBone(c, x1, y1, x2, y2, r1, r2, isDark, accentColor) {
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const perp = angle + Math.PI / 2;

      const p1x = x1 + Math.cos(perp) * r1;
      const p1y = y1 + Math.sin(perp) * r1;
      const p2x = x1 - Math.cos(perp) * r1;
      const p2y = y1 - Math.sin(perp) * r1;
      const p3x = x2 - Math.cos(perp) * r2;
      const p3y = y2 - Math.sin(perp) * r2;
      const p4x = x2 + Math.cos(perp) * r2;
      const p4y = y2 + Math.sin(perp) * r2;

      const grad = c.createLinearGradient(p1x, p1y, p2x, p2y);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, isDark ? '#e2e8f0' : '#f8fafc');
      grad.addColorStop(0.8, isDark ? '#1e293b' : '#cbd5e1');
      grad.addColorStop(1, isDark ? '#0f172a' : '#94a3b8');
      c.fillStyle = grad;
      c.strokeStyle = isDark ? '#334155' : '#cbd5e1';
      c.lineWidth = 1.5;

      c.beginPath();
      c.moveTo(p1x, p1y);
      c.lineTo(p4x, p4y);
      c.arc(x2, y2, r2, perp, perp + Math.PI);
      c.lineTo(p2x, p2y);
      c.arc(x1, y1, r1, perp + Math.PI, perp);
      c.closePath();
      c.fill();
      c.stroke();

      // Colored center accent stripe
      c.strokeStyle = accentColor;
      c.lineWidth = 2.5;
      c.beginPath();
      c.moveTo(x1 + (x2 - x1) * 0.22, y1 + (y2 - y1) * 0.22);
      c.lineTo(x1 + (x2 - x1) * 0.78, y1 + (y2 - y1) * 0.78);
      c.stroke();
    }
  }, [darkMode]);

  return (
    <div
      className="relative w-full aspect-[16/10] sm:aspect-video select-none pointer-events-auto bg-transparent"
    >
      <canvas ref={canvasRef} className="w-full h-full block" style={{ touchAction: 'none' }} />
    </div>
  );
}
