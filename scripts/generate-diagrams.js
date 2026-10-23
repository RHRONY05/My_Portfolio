const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const sabaiHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1720px;
    height: 960px;
    background-color: #F8FAFC;
    background-image: radial-gradient(#CBD5E1 1.4px, transparent 1.4px);
    background-size: 24px 24px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #0F172A;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 56px;
    position: relative;
    overflow: hidden;
  }

  /* Header Section */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 28px;
  }
  .header-left {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #E0E7FF;
    color: #4338CA;
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 13px;
    font-weight: 700;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    letter-spacing: 0.08em;
    width: fit-content;
    text-transform: uppercase;
  }
  .title {
    font-size: 38px;
    font-weight: 900;
    letter-spacing: -0.03em;
    color: #0F172A;
    line-height: 1.15;
  }
  .subtitle {
    font-size: 17px;
    color: #64748B;
    font-weight: 500;
    max-width: 950px;
  }
  .engine-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
    padding: 10px 18px;
    border-radius: 14px;
  }
  .engine-dot {
    width: 10px;
    height: 10px;
    border-radius: 9999px;
    background: #10B981;
    box-shadow: 0 0 10px #10B981;
  }
  .engine-text {
    font-size: 13px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    font-weight: 700;
    color: #334155;
    letter-spacing: 0.04em;
  }

  /* 5-Step Process Grid */
  .flow-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    position: relative;
    flex: 1;
    margin: 10px 0 24px 0;
  }

  .step-card {
    flex: 1;
    height: 480px;
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 20px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 4px 8px -2px rgba(15, 23, 42, 0.03);
    position: relative;
    transition: transform 0.2s ease;
  }

  .card-top {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .step-badge-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .step-num {
    font-size: 13px;
    font-weight: 900;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    padding: 4px 12px;
    border-radius: 8px;
    letter-spacing: 0.05em;
  }

  .step-phase {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #94A3B8;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
  }

  .card-title {
    font-size: 20px;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.25;
    letter-spacing: -0.02em;
  }

  .card-subtitle {
    font-size: 13px;
    font-weight: 600;
    line-height: 1.4;
  }

  .card-divider {
    height: 1px;
    width: 100%;
    background: #F1F5F9;
    margin: 4px 0;
  }

  /* What Happens Box */
  .details-box {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .details-header {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #64748B;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
  }

  .bullet-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .bullet-item {
    font-size: 12.5px;
    line-height: 1.4;
    color: #334155;
    font-weight: 500;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  .bullet-dot {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    margin-top: 5px;
    flex-shrink: 0;
  }

  /* Card Color Themes */
  /* 01: Emerald / WhatsApp */
  .card-emerald {
    border-color: #A7F3D0;
    border-top: 5px solid #10B981;
  }
  .card-emerald .step-num { background: #ECFDF5; color: #047857; }
  .card-emerald .card-subtitle { color: #059669; }
  .card-emerald .bullet-dot { background: #10B981; }

  /* 02: Sky / n8n Orchestrator */
  .card-sky {
    border-color: #BAE6FD;
    border-top: 5px solid #0EA5E9;
  }
  .card-sky .step-num { background: #F0F9FF; color: #0369A1; }
  .card-sky .card-subtitle { color: #0284C7; }
  .card-sky .bullet-dot { background: #0EA5E9; }

  /* 03: Amber / Clinical RAG */
  .card-amber {
    border-color: #FDE68A;
    border-top: 5px solid #F59E0B;
  }
  .card-amber .step-num { background: #FFFBEB; color: #B45309; }
  .card-amber .card-subtitle { color: #D97706; }
  .card-amber .bullet-dot { background: #F59E0B; }

  /* 04: Rose / Autonomous Tools */
  .card-rose {
    border-color: #FECDD3;
    border-top: 5px solid #F43F5E;
  }
  .card-rose .step-num { background: #FFF1F2; color: #BE123C; }
  .card-rose .card-subtitle { color: #E11D48; }
  .card-rose .bullet-dot { background: #F43F5E; }

  /* 05: Teal / Patient Messenger Delivery */
  .card-teal {
    border-color: #99F6E4;
    border-top: 5px solid #14B8A6;
  }
  .card-teal .step-num { background: #F0FDFA; color: #0F766E; }
  .card-teal .card-subtitle { color: #0D9488; }
  .card-teal .bullet-dot { background: #14B8A6; }

  /* Connecting Arrows */
  .connector {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 22px;
  }
  .connector svg {
    stroke: #94A3B8;
    stroke-width: 2.5;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* Bottom Outcome Banner */
  .footer-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 16px;
    padding: 16px 28px;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
  }
  .footer-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .result-badge {
    background: #0F172A;
    color: #FFFFFF;
    font-size: 11px;
    font-weight: 800;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    padding: 6px 14px;
    border-radius: 8px;
    letter-spacing: 0.08em;
  }
  .result-text {
    font-size: 14.5px;
    font-weight: 700;
    color: #1E293B;
  }
  .footer-stats {
    display: flex;
    align-items: center;
    gap: 28px;
  }
  .stat-item {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }
  .stat-val {
    font-size: 18px;
    font-weight: 900;
    color: #0F172A;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
  }
  .stat-label {
    font-size: 12px;
    color: #64748B;
    font-weight: 600;
    text-transform: uppercase;
  }
</style>
</head>
<body>

  <!-- Top Title Bar -->
  <div class="header">
    <div class="header-left">
      <span class="tag">AI Health Architecture</span>
      <h1 class="title">Sabai: Autonomous AI Health Assistant</h1>
      <p class="subtitle">End-to-end event loop from patient messaging through n8n orchestration, clinical RAG grounding, tool calling, and instant triage response</p>
    </div>
    <div class="engine-badge">
      <div class="engine-dot"></div>
      <span class="engine-text">n8n Event Engine Active</span>
    </div>
  </div>

  <!-- 5-Step Process Sequence -->
  <div class="flow-container">

    <!-- Step 1: Ingestion -->
    <div class="step-card card-emerald">
      <div class="card-top">
        <div class="step-badge-row">
          <span class="step-num">01</span>
          <span class="step-phase">Ingestion</span>
        </div>
        <h3 class="card-title">Omnichannel Trigger</h3>
        <p class="card-subtitle">WhatsApp & Telegram</p>
        <div class="card-divider"></div>
        <p style="font-size: 12.5px; color: #475569; line-height: 1.45;">Patient initiates query via WhatsApp or Telegram without downloading specialized hospital apps.</p>
      </div>

      <div class="details-box">
        <span class="details-header">Node Logic:</span>
        <ul class="bullet-list">
          <li class="bullet-item"><span class="bullet-dot"></span><span>Real-time webhook capture</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Normalizes phone & sender ID</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Validates HMAC webhook signatures</span></li>
        </ul>
      </div>
    </div>

    <!-- Arrow 1 -->
    <div class="connector">
      <svg width="22" height="22" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>

    <!-- Step 2: Orchestration -->
    <div class="step-card card-sky">
      <div class="card-top">
        <div class="step-badge-row">
          <span class="step-num">02</span>
          <span class="step-phase">Router</span>
        </div>
        <h3 class="card-title">n8n Orchestrator</h3>
        <p class="card-subtitle">Identity & Intent Parser</p>
        <div class="card-divider"></div>
        <p style="font-size: 12.5px; color: #475569; line-height: 1.45;">Central workflow normalizes incoming payloads, retrieves conversation history, and evaluates urgency.</p>
      </div>

      <div class="details-box">
        <span class="details-header">Node Logic:</span>
        <ul class="bullet-list">
          <li class="bullet-item"><span class="bullet-dot"></span><span>Redis sliding-window chat memory</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Classifies emergency triage level</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Dispatches sub-workflow execution</span></li>
        </ul>
      </div>
    </div>

    <!-- Arrow 2 -->
    <div class="connector">
      <svg width="22" height="22" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>

    <!-- Step 3: Knowledge RAG -->
    <div class="step-card card-amber">
      <div class="card-top">
        <div class="step-badge-row">
          <span class="step-num">03</span>
          <span class="step-phase">Knowledge</span>
        </div>
        <h3 class="card-title">Clinical RAG Layer</h3>
        <p class="card-subtitle">Medical Vector Knowledge Base</p>
        <div class="card-divider"></div>
        <p style="font-size: 12.5px; color: #475569; line-height: 1.45;">Embeds query to query verified clinical documentation, clinic opening hours, and symptom guidelines.</p>
      </div>

      <div class="details-box">
        <span class="details-header">Node Logic:</span>
        <ul class="bullet-list">
          <li class="bullet-item"><span class="bullet-dot"></span><span>Vector embeddings matching</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Verified clinic SOP grounding</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Zero medical hallucination guard</span></li>
        </ul>
      </div>
    </div>

    <!-- Arrow 3 -->
    <div class="connector">
      <svg width="22" height="22" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>

    <!-- Step 4: Autonomous Tool Loop -->
    <div class="step-card card-rose">
      <div class="card-top">
        <div class="step-badge-row">
          <span class="step-num">04</span>
          <span class="step-phase">Decision</span>
        </div>
        <h3 class="card-title">Autonomous Tools</h3>
        <p class="card-subtitle">Doctor Escalation & Booking</p>
        <div class="card-divider"></div>
        <p style="font-size: 12.5px; color: #475569; line-height: 1.45;">AI reasoning loop evaluates whether specialized tools are required or immediate human clinician hand-off.</p>
      </div>

      <div class="details-box">
        <span class="details-header">Node Logic:</span>
        <ul class="bullet-list">
          <li class="bullet-item"><span class="bullet-dot"></span><span>Live calendar appointment booking</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Escalates high-risk cases to staff</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Executes verified database queries</span></li>
        </ul>
      </div>
    </div>

    <!-- Arrow 4 -->
    <div class="connector">
      <svg width="22" height="22" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>

    <!-- Step 5: Real-Time Patient Delivery -->
    <div class="step-card card-teal">
      <div class="card-top">
        <div class="step-badge-row">
          <span class="step-num">05</span>
          <span class="step-phase">Delivery</span>
        </div>
        <h3 class="card-title">Patient Response</h3>
        <p class="card-subtitle">WhatsApp & Telegram Reply</p>
        <div class="card-divider"></div>
        <p style="font-size: 12.5px; color: #475569; line-height: 1.45;">Generates formatted, empathetic guidance and dispatches directly back to the user's messaging screen.</p>
      </div>

      <div class="details-box">
        <span class="details-header">Node Logic:</span>
        <ul class="bullet-list">
          <li class="bullet-item"><span class="bullet-dot"></span><span>Markdown & interactive quick buttons</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Multi-language translation support</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Instant &lt; 2.5s end-to-end latency</span></li>
        </ul>
      </div>
    </div>

  </div>

  <!-- Bottom Outcome Bar -->
  <div class="footer-banner">
    <div class="footer-left">
      <span class="result-badge">OUTCOME</span>
      <span class="result-text">24/7 automated first-line healthcare triage & scheduling with 100% verified clinical grounding.</span>
    </div>
    <div class="footer-stats">
      <div class="stat-item">
        <span class="stat-val">24/7</span>
        <span class="stat-label">Availability</span>
      </div>
      <div class="stat-item">
        <span class="stat-val">3</span>
        <span class="stat-label">Platforms</span>
      </div>
      <div class="stat-item">
        <span class="stat-val">&lt; 2.5s</span>
        <span class="stat-label">Triage Speed</span>
      </div>
      <div class="stat-item">
        <span class="stat-val">0</span>
        <span class="stat-label">App Installs</span>
      </div>
    </div>
  </div>

</body>
</html>
`;

const zoomflowHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1720px;
    height: 960px;
    background-color: #F8FAFC;
    background-image: radial-gradient(#CBD5E1 1.4px, transparent 1.4px);
    background-size: 24px 24px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #0F172A;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 56px;
    position: relative;
    overflow: hidden;
  }

  /* Header Section */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 28px;
  }
  .header-left {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #E0E7FF;
    color: #4338CA;
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 13px;
    font-weight: 700;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    letter-spacing: 0.08em;
    width: fit-content;
    text-transform: uppercase;
  }
  .title {
    font-size: 38px;
    font-weight: 900;
    letter-spacing: -0.03em;
    color: #0F172A;
    line-height: 1.15;
  }
  .subtitle {
    font-size: 17px;
    color: #64748B;
    font-weight: 500;
    max-width: 950px;
  }
  .engine-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
    padding: 10px 18px;
    border-radius: 14px;
  }
  .engine-dot {
    width: 10px;
    height: 10px;
    border-radius: 9999px;
    background: #10B981;
    box-shadow: 0 0 10px #10B981;
  }
  .engine-text {
    font-size: 13px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    font-weight: 700;
    color: #334155;
    letter-spacing: 0.04em;
  }

  /* 4-Step Process Grid */
  .flow-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    position: relative;
    flex: 1;
    margin: 10px 0 24px 0;
  }

  .step-card {
    flex: 1;
    height: 480px;
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 20px;
    padding: 28px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 4px 8px -2px rgba(15, 23, 42, 0.03);
    position: relative;
  }

  .card-top {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .step-badge-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .step-num {
    font-size: 13px;
    font-weight: 900;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    padding: 4px 12px;
    border-radius: 8px;
    letter-spacing: 0.05em;
  }

  .step-phase {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #94A3B8;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
  }

  .card-title {
    font-size: 22px;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.25;
    letter-spacing: -0.02em;
  }

  .card-subtitle {
    font-size: 13.5px;
    font-weight: 600;
    line-height: 1.4;
  }

  .card-divider {
    height: 1px;
    width: 100%;
    background: #F1F5F9;
    margin: 4px 0;
  }

  /* What Happens Box */
  .details-box {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .details-header {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #64748B;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
  }

  .bullet-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 9px;
  }

  .bullet-item {
    font-size: 13px;
    line-height: 1.4;
    color: #334155;
    font-weight: 500;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  .bullet-dot {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    margin-top: 5px;
    flex-shrink: 0;
  }

  /* Card Color Themes */
  /* 01: Blue / Zoom Cloud */
  .card-blue {
    border-color: #BFDBFE;
    border-top: 5px solid #2563EB;
  }
  .card-blue .step-num { background: #EFF6FF; color: #1D4ED8; }
  .card-blue .card-subtitle { color: #2563EB; }
  .card-blue .bullet-dot { background: #2563EB; }

  /* 02: Violet / n8n Pipeline */
  .card-violet {
    border-color: #DDD6FE;
    border-top: 5px solid #7C3AED;
  }
  .card-violet .step-num { background: #F5F3FF; color: #6D28D9; }
  .card-violet .card-subtitle { color: #7C3AED; }
  .card-violet .bullet-dot { background: #7C3AED; }

  /* 03: Emerald / Google Drive */
  .card-emerald {
    border-color: #A7F3D0;
    border-top: 5px solid #059669;
  }
  .card-emerald .step-num { background: #ECFDF5; color: #047857; }
  .card-emerald .card-subtitle { color: #059669; }
  .card-emerald .bullet-dot { background: #059669; }

  /* 04: Coral / Zoom Cloud Purge */
  .card-coral {
    border-color: #FECDD3;
    border-top: 5px solid #E11D48;
  }
  .card-coral .step-num { background: #FFF1F2; color: #BE123C; }
  .card-coral .card-subtitle { color: #E11D48; }
  .card-coral .bullet-dot { background: #E11D48; }

  /* Connecting Arrows */
  .connector {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 24px;
  }
  .connector svg {
    stroke: #94A3B8;
    stroke-width: 2.5;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* Bottom Outcome Banner */
  .footer-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 16px;
    padding: 16px 28px;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
  }
  .footer-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .result-badge {
    background: #0F172A;
    color: #FFFFFF;
    font-size: 11px;
    font-weight: 800;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    padding: 6px 14px;
    border-radius: 8px;
    letter-spacing: 0.08em;
  }
  .result-text {
    font-size: 14.5px;
    font-weight: 700;
    color: #1E293B;
  }
  .footer-stats {
    display: flex;
    align-items: center;
    gap: 28px;
  }
  .stat-item {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }
  .stat-val {
    font-size: 18px;
    font-weight: 900;
    color: #0F172A;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
  }
  .stat-label {
    font-size: 12px;
    color: #64748B;
    font-weight: 600;
    text-transform: uppercase;
  }
</style>
</head>
<body>

  <!-- Top Title Bar -->
  <div class="header">
    <div class="header-left">
      <span class="tag">Cloud Automation Architecture</span>
      <h1 class="title">ZoomFlow: Automated Cloud Recording Pipeline</h1>
      <p class="subtitle">Event-driven recording pipeline offloading Zoom media to Google Drive with automated cloud storage purging</p>
    </div>
    <div class="engine-badge">
      <div class="engine-dot"></div>
      <span class="engine-text">n8n Event Engine Active</span>
    </div>
  </div>

  <!-- 4-Step Process Sequence -->
  <div class="flow-container">

    <!-- Step 1: Zoom Cloud -->
    <div class="step-card card-blue">
      <div class="card-top">
        <div class="step-badge-row">
          <span class="step-num">01</span>
          <span class="step-phase">Trigger</span>
        </div>
        <h3 class="card-title">Zoom Cloud</h3>
        <p class="card-subtitle">Recording Finished Event</p>
        <div class="card-divider"></div>
        <p style="font-size: 13px; color: #475569; line-height: 1.45;">Client meeting concludes and Zoom completes cloud rendering of multi-stream audio, video, and transcript files.</p>
      </div>

      <div class="details-box">
        <span class="details-header">Node Execution:</span>
        <ul class="bullet-list">
          <li class="bullet-item"><span class="bullet-dot"></span><span>Fires real-time webhook payload</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Includes OAuth bearer download tokens</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Attaches meeting topic & metadata</span></li>
        </ul>
      </div>
    </div>

    <!-- Arrow 1 -->
    <div class="connector">
      <svg width="24" height="24" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>

    <!-- Step 2: n8n Pipeline Engine -->
    <div class="step-card card-violet">
      <div class="card-top">
        <div class="step-badge-row">
          <span class="step-num">02</span>
          <span class="step-phase">Orchestration</span>
        </div>
        <h3 class="card-title">n8n Pipeline Engine</h3>
        <p class="card-subtitle">Validation & Quality Filter</p>
        <div class="card-divider"></div>
        <p style="font-size: 13px; color: #475569; line-height: 1.45;">Self-hosted n8n instance on Linux VPS verifies webhook security, normalizes UUIDs, and filters recording streams.</p>
      </div>

      <div class="details-box">
        <span class="details-header">Node Execution:</span>
        <ul class="bullet-list">
          <li class="bullet-item"><span class="bullet-dot"></span><span>HMAC-SHA256 handshake verification</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Selects highest-bitrate MP4 & M4A</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Idempotency: blocks duplicate retry runs</span></li>
        </ul>
      </div>
    </div>

    <!-- Arrow 2 -->
    <div class="connector">
      <svg width="24" height="24" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>

    <!-- Step 3: Google Drive Sync -->
    <div class="step-card card-emerald">
      <div class="card-top">
        <div class="step-badge-row">
          <span class="step-num">03</span>
          <span class="step-phase">Storage Sync</span>
        </div>
        <h3 class="card-title">Google Drive</h3>
        <p class="card-subtitle">Organized Secure Archival</p>
        <div class="card-divider"></div>
        <p style="font-size: 13px; color: #475569; line-height: 1.45;">Streams large video binaries chunk-by-chunk into structured Google Drive directories named by topic and timestamp.</p>
      </div>

      <div class="details-box">
        <span class="details-header">Node Execution:</span>
        <ul class="bullet-list">
          <li class="bullet-item"><span class="bullet-dot"></span><span>Creates topic & ISO-dated folders</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Streams video, audio, & VTT transcripts</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Validates confirmed upload status</span></li>
        </ul>
      </div>
    </div>

    <!-- Arrow 3 -->
    <div class="connector">
      <svg width="24" height="24" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>

    <!-- Step 4: Zoom Purge -->
    <div class="step-card card-coral">
      <div class="card-top">
        <div class="step-badge-row">
          <span class="step-num">04</span>
          <span class="step-phase">Cleanup</span>
        </div>
        <h3 class="card-title">Zero-Cost Purge</h3>
        <p class="card-subtitle">Zoom Cloud Storage Reset</p>
        <div class="card-divider"></div>
        <p style="font-size: 13px; color: #475569; line-height: 1.45;">Double-encodes meeting UUID and triggers Zoom OAuth REST DELETE API to keep cloud storage strictly at 0%.</p>
      </div>

      <div class="details-box">
        <span class="details-header">Node Execution:</span>
        <ul class="bullet-list">
          <li class="bullet-item"><span class="bullet-dot"></span><span>Double-URL encodes special-char UUIDs</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Purges cloud file only after Drive confirmation</span></li>
          <li class="bullet-item"><span class="bullet-dot"></span><span>Eliminates recurring monthly overage fees</span></li>
        </ul>
      </div>
    </div>

  </div>

  <!-- Bottom Outcome Bar -->
  <div class="footer-banner">
    <div class="footer-left">
      <span class="result-badge">OUTCOME</span>
      <span class="result-text">100% elimination of Zoom storage overage fees with infinite recording retention.</span>
    </div>
    <div class="footer-stats">
      <div class="stat-item">
        <span class="stat-val">$0</span>
        <span class="stat-label">Overage Fees</span>
      </div>
      <div class="stat-item">
        <span class="stat-val">100%</span>
        <span class="stat-label">Automated</span>
      </div>
      <div class="stat-item">
        <span class="stat-val">Zero</span>
        <span class="stat-label">Data Loss</span>
      </div>
      <div class="stat-item">
        <span class="stat-val">10 GB</span>
        <span class="stat-label">Cap Eliminated</span>
      </div>
    </div>
  </div>

</body>
</html>
`;

async function generate() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1720, height: 960, deviceScaleFactor: 2 });

  // 1. Render Sabai Diagram
  console.log('Rendering Sabai Health Assistant Diagram...');
  await page.setContent(sabaiHtml, { waitUntil: 'domcontentloaded' });
  const sabaiDir = path.resolve('public/images/projects/sabai_health_assistant');
  if (!fs.existsSync(sabaiDir)) fs.mkdirSync(sabaiDir, { recursive: true });
  const sabaiPath = path.join(sabaiDir, 'architecture_diagram.webp');
  await page.screenshot({ path: sabaiPath, type: 'webp', quality: 95 });
  console.log('Saved Sabai diagram to:', sabaiPath);

  // 2. Render ZoomFlow Diagram
  console.log('Rendering ZoomFlow Diagram...');
  await page.setContent(zoomflowHtml, { waitUntil: 'domcontentloaded' });
  const zoomDir = path.resolve('public/images/projects/zoom-automation');
  if (!fs.existsSync(zoomDir)) fs.mkdirSync(zoomDir, { recursive: true });
  const zoomPath = path.join(zoomDir, 'architecture_diagram.webp');
  await page.screenshot({ path: zoomPath, type: 'webp', quality: 95 });
  console.log('Saved ZoomFlow diagram to:', zoomPath);

  await browser.close();
  console.log('Done!');
}

generate().catch(err => {
  console.error('Error generating diagrams:', err);
  process.exit(1);
});
