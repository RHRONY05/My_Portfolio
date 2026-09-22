import * as THREE from "three";

/**
 * Helper to draw an image covering a target rectangle without stretching
 */
function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const imgRatio = img.width / img.height;
  const targetRatio = w / h;
  let sx = 0;
  let sy = 0;
  let sw = img.width;
  let sh = img.height;

  if (imgRatio > targetRatio) {
    sw = img.height * targetRatio;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / targetRatio;
    sy = (img.height - sh) / 2;
  }

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  ctx.restore();
}

/**
 * Creates an authentic high-resolution graphic novel front cover texture
 */
export function createFrontCoverTexture(portraitImage?: HTMLImageElement): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1536; // 2:3 comic book ratio
  const ctx = canvas.getContext("2d");

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Background
  ctx.fillStyle = "#0D1117";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Halftone / Ben-Day Dot Pattern Background
  ctx.fillStyle = "rgba(48, 54, 61, 0.4)";
  const dotSpacing = 16;
  for (let x = 20; x < canvas.width - 20; x += dotSpacing) {
    for (let y = 20; y < canvas.height - 20; y += dotSpacing) {
      ctx.beginPath();
      ctx.arc(x, y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 3. Vintage Double Comic Border
  ctx.strokeStyle = "#30363D";
  ctx.lineWidth = 6;
  ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);
  ctx.strokeStyle = "#00FF94";
  ctx.lineWidth = 2;
  ctx.strokeRect(44, 44, canvas.width - 88, canvas.height - 88);

  // 4. Top Header Box (Issue & Date)
  ctx.fillStyle = "#161B22";
  ctx.fillRect(56, 56, 170, 110);
  ctx.strokeStyle = "#30363D";
  ctx.lineWidth = 3;
  ctx.strokeRect(56, 56, 170, 110);

  ctx.fillStyle = "#00FF94";
  ctx.font = "bold 26px monospace";
  ctx.fillText("VOL. 1", 72, 92);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 22px monospace";
  ctx.fillText("ISSUE #01", 72, 122);
  ctx.fillStyle = "#8B949E";
  ctx.font = "16px monospace";
  ctx.fillText("2022-23", 72, 148);

  // 5. Parody Comics Code Authority Seal (Top Right)
  ctx.fillStyle = "#161B22";
  ctx.fillRect(canvas.width - 240, 56, 184, 110);
  ctx.strokeStyle = "#00FF94";
  ctx.lineWidth = 3;
  ctx.strokeRect(canvas.width - 240, 56, 184, 110);

  ctx.fillStyle = "#00FF94";
  ctx.font = "bold 13px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("APPROVED BY THE", canvas.width - 148, 82);
  ctx.font = "bold 17px sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("RH.RONY", canvas.width - 148, 108);
  ctx.font = "bold 12px sans-serif";
  ctx.fillStyle = "#00FF94";
  ctx.fillText("CODE AUTHORITY", canvas.width - 148, 132);
  ctx.font = "11px monospace";
  ctx.fillStyle = "#8B949E";
  ctx.fillText("CUET CSE", canvas.width - 148, 152);
  ctx.textAlign = "left";

  // 6. Giant Comic Masthead Title: RH.RONY
  ctx.fillStyle = "rgba(0, 255, 148, 0.15)";
  ctx.font = "900 134px sans-serif";
  ctx.fillText("RH.RONY", 66, 314);

  ctx.fillStyle = "#00FF94";
  ctx.font = "900 130px sans-serif";
  ctx.shadowColor = "rgba(0, 255, 148, 0.5)";
  ctx.shadowBlur = 25;
  ctx.fillText("RH.RONY", 60, 310);
  ctx.shadowBlur = 0; // reset shadow

  // Subtitle Ribbon
  ctx.fillStyle = "#161B22";
  ctx.fillRect(60, 336, canvas.width - 120, 44);
  ctx.strokeStyle = "#30363D";
  ctx.lineWidth = 2;
  ctx.strokeRect(60, 336, canvas.width - 120, 44);

  ctx.fillStyle = "#58A6FF";
  ctx.font = "bold 20px monospace";
  ctx.textAlign = "center";
  ctx.fillText("ROBIUL HASAN RONY // ARCHITECT OF INTELLIGENCE", canvas.width / 2, 366);
  ctx.textAlign = "left";

  // 7. Center Illustration Frame (Portrait Area)
  const frameX = 60;
  const frameY = 405;
  const frameW = canvas.width - 120;
  const frameH = 885;

  ctx.fillStyle = "#161B22";
  ctx.fillRect(frameX, frameY, frameW, frameH);

  if (portraitImage) {
    // Draw the generated comic illustration fitting cleanly inside the frame
    drawImageCover(ctx, portraitImage, frameX, frameY, frameW, frameH);

    // Subtle inner vignette and border
    ctx.strokeStyle = "#00FF94";
    ctx.lineWidth = 3;
    ctx.strokeRect(frameX, frameY, frameW, frameH);
  } else {
    // Blueprint Grid & Terminal Matrix Placeholder while image loads
    ctx.strokeStyle = "rgba(88, 166, 255, 0.2)";
    ctx.lineWidth = 1;
    for (let x = frameX; x <= frameX + frameW; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, frameY);
      ctx.lineTo(x, frameY + frameH);
      ctx.stroke();
    }
    for (let y = frameY; y <= frameY + frameH; y += 40) {
      ctx.beginPath();
      ctx.moveTo(frameX, y);
      ctx.lineTo(frameX + frameW, y);
      ctx.stroke();
    }

    ctx.strokeStyle = "#00FF94";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, frameY + frameH / 2 - 40, 160, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#00FF94";
    ctx.font = "bold 26px monospace";
    ctx.textAlign = "center";
    ctx.fillText("RH.RONY // PORTRAIT STAGING", canvas.width / 2, frameY + frameH / 2 - 50);
    ctx.font = "18px monospace";
    ctx.fillStyle = "#8B949E";
    ctx.fillText("CUET-CSE-2022-23 COMMAND TERMINAL", canvas.width / 2, frameY + frameH / 2);
    ctx.textAlign = "left";

    ctx.strokeStyle = "#30363D";
    ctx.lineWidth = 4;
    ctx.strokeRect(frameX, frameY, frameW, frameH);
  }

  // 8. Bottom Dramatic Comic Tagline Banner
  ctx.fillStyle = "#00FF94";
  ctx.fillRect(60, canvas.height - 180, canvas.width - 120, 90);

  ctx.fillStyle = "#00391D";
  ctx.font = "900 27px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("CAN ONE ENGINEER HARNESS THE INFINITE AGENTS?!", canvas.width / 2, canvas.height - 136);

  ctx.font = "bold 17px monospace";
  ctx.fillText("FEATURING: NEXT.JS 16 • AUTONOMOUS AI • CUET ORIGINS", canvas.width / 2, canvas.height - 106);
  ctx.textAlign = "left";

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates an authentic high-resolution classified dossier back cover texture
 */
export function createBackCoverTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1536;
  const ctx = canvas.getContext("2d");

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Background
  ctx.fillStyle = "#0D1117";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Blueprint Border
  ctx.strokeStyle = "#30363D";
  ctx.lineWidth = 6;
  ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);
  ctx.strokeStyle = "#58A6FF";
  ctx.lineWidth = 2;
  ctx.strokeRect(44, 44, canvas.width - 88, canvas.height - 88);

  // 3. Classified Header Banner
  ctx.fillStyle = "#161B22";
  ctx.fillRect(60, 60, canvas.width - 120, 110);
  ctx.strokeStyle = "#30363D";
  ctx.lineWidth = 2;
  ctx.strokeRect(60, 60, canvas.width - 120, 110);

  ctx.fillStyle = "#58A6FF";
  ctx.font = "bold 20px monospace";
  ctx.fillText("CLASSIFIED ARCHIVES // DEPT. OF AUTONOMOUS SYSTEMS", 84, 102);

  ctx.fillStyle = "#00FF94";
  ctx.font = "bold 26px sans-serif";
  ctx.fillText("DOSSIER REGISTRATION: RH.RONY", 84, 142);

  // 4. Mission Directive Box
  ctx.fillStyle = "#161B22";
  ctx.fillRect(60, 200, canvas.width - 120, 260);
  ctx.strokeStyle = "#00FF94";
  ctx.lineWidth = 2;
  ctx.strokeRect(60, 200, canvas.width - 120, 260);

  ctx.fillStyle = "#00FF94";
  ctx.font = "bold 18px monospace";
  ctx.fillText("CORE DIRECTIVE:", 90, 244);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "24px sans-serif";
  ctx.fillText("\"Eliminate repetitive human friction.", 90, 290);
  ctx.fillText(" Architect resilient, autonomous systems that scale.\"", 90, 326);

  ctx.fillStyle = "#8B949E";
  ctx.font = "18px monospace";
  ctx.fillText("SPECIALIZATION: Next.js 16 • Node.js • Autonomous AI Workflows", 90, 390);
  ctx.fillText("ACADEMIC ORIGIN: CUET (Chittagong Univ. of Eng. & Tech)", 90, 424);

  // 5. The Three Laws of Architecture
  ctx.fillStyle = "#161B22";
  ctx.fillRect(60, 490, canvas.width - 120, 400);
  ctx.strokeStyle = "#30363D";
  ctx.lineWidth = 2;
  ctx.strokeRect(60, 490, canvas.width - 120, 400);

  ctx.fillStyle = "#58A6FF";
  ctx.font = "bold 20px monospace";
  ctx.fillText("THE THREE LAWS OF ARCHITECTURE:", 90, 538);

  const laws = [
    { num: "01", title: "RESILIENCE UNDER LOAD", desc: "Software is measured by how it recovers when the unexpected occurs." },
    { num: "02", title: "MODULAR ZERO-BLOAT", desc: "Every dependency must justify its existence. Clean beats clever." },
    { num: "03", title: "AUTONOMOUS EFFICIENCY", desc: "Delegate mechanical repetition to AI agents so humans can invent." },
  ];

  laws.forEach((law, i) => {
    const y = 600 + i * 90;
    ctx.fillStyle = "#00FF94";
    ctx.font = "bold 24px monospace";
    ctx.fillText(law.num, 90, y);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 19px sans-serif";
    ctx.fillText(law.title, 140, y - 4);

    ctx.fillStyle = "#8B949E";
    ctx.font = "16px sans-serif";
    ctx.fillText(law.desc, 140, y + 22);
  });

  // 6. Dispatch CTA Stamp
  ctx.fillStyle = "#161B22";
  ctx.fillRect(60, 920, canvas.width - 120, 180);
  ctx.strokeStyle = "#00FF94";
  ctx.lineWidth = 2;
  ctx.strokeRect(60, 920, canvas.width - 120, 180);

  ctx.fillStyle = "#8B949E";
  ctx.font = "bold 16px monospace";
  ctx.textAlign = "center";
  ctx.fillText("TO BE CONTINUED IN YOUR NEXT PRODUCTION SPRINT...", canvas.width / 2, 966);

  ctx.fillStyle = "#00FF94";
  ctx.font = "bold 28px sans-serif";
  ctx.fillText("READY TO BUILD SOMETHING EXTRAORDINARY?", canvas.width / 2, 1014);

  ctx.fillStyle = "#58A6FF";
  ctx.font = "bold 20px monospace";
  ctx.fillText("INITIATE MISSION INQUIRY: RONY.DEV", canvas.width / 2, 1058);
  ctx.textAlign = "left";

  // 7. Authentic Vintage Barcode & CUET-CSE-2022-23 Serial
  const barY = 1140;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(60, barY, canvas.width - 120, 180);

  ctx.fillStyle = "#000000";
  const startBarX = 90;
  let currX = startBarX;
  const barPattern = [3, 1, 4, 2, 1, 5, 2, 3, 1, 4, 2, 6, 1, 3, 2, 5, 4, 1, 2, 3, 5, 2, 1, 4, 3, 2, 5, 1, 4, 2, 3, 1, 5, 2, 4, 1, 3, 2];
  
  barPattern.forEach((w) => {
    ctx.fillRect(currX, barY + 20, w * 2.5, 95);
    currX += (w * 2.5) + (w % 2 === 0 ? 4 : 2);
  });

  ctx.fillStyle = "#000000";
  ctx.font = "bold 22px monospace";
  ctx.textAlign = "center";
  ctx.fillText("9 780201 379624", canvas.width / 2, barY + 145);

  ctx.fillStyle = "#00391D";
  ctx.font = "bold 18px monospace";
  ctx.fillText("CUET-CSE-2022-23 // OFFICIAL ARCHIVE SERIAL #01", canvas.width / 2, barY + 168);
  ctx.textAlign = "left";

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
