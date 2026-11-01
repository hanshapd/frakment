/* eslint-disable complexity, no-plusplus, no-use-before-define, prefer-destructuring, @typescript-eslint/ban-ts-comment, unicorn/consistent-function-scoping, unicorn/no-array-fill-with-reference-type, unicorn/no-array-for-each, unicorn/no-array-sort, unicorn/prefer-add-event-listener, unicorn/prefer-math-min-max, unicorn/prefer-number-coercion, unicorn/prefer-query-selector */
// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";

interface OrbsProps {
  className?: string;
}

const LANDING_ORB_TURN = 3000;
const LANDING_GRAIN_TILE = 160;

const ORBS = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    icon: "chatgpt",
    size: 104,
  },
  {
    id: "claude",
    label: "Claude",
    icon: "claude",
    size: 104,
  },
  {
    id: "gemini",
    label: "Gemini",
    icon: "gemini",
    size: 104,
  },
  {
    id: "opencode",
    label: "OpenCode",
    icon: "opencode",
    size: 104,
  },
  {
    id: "grok",
    label: "Grok",
    icon: "grok",
    size: 104,
  },
  {
    id: "t3",
    label: "Code",
    icon: "t3",
    size: 104,
  },
] as const;

const ORB_ICON_SVGS = {
  chatgpt:
    '<svg fill="currentColor" fill-rule="evenodd" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z"></path></svg>',
  claude:
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" fill="#D97757" fill-rule="nonzero"></path></svg>',
  gemini:
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="#3186FF"></path><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#lobe-icons-gemini-0-_R_0_)"></path><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#lobe-icons-gemini-1-_R_0_)"></path><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#lobe-icons-gemini-2-_R_0_)"></path><defs><linearGradient gradientUnits="userSpaceOnUse" id="lobe-icons-gemini-0-_R_0_" x1="7" x2="11" y1="15.5" y2="12"><stop stop-color="#08B962"></stop><stop offset="1" stop-color="#08B962" stop-opacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="lobe-icons-gemini-1-_R_0_" x1="8" x2="11.5" y1="5.5" y2="11"><stop stop-color="#F94543"></stop><stop offset="1" stop-color="#F94543" stop-opacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="lobe-icons-gemini-2-_R_0_" x1="3.5" x2="17.5" y1="13.5" y2="12"><stop stop-color="#FABC12"></stop><stop offset=".46" stop-color="#FABC12" stop-opacity="0"></stop></linearGradient></defs></svg>',
  opencode:
    '<svg fill="currentColor" fill-rule="evenodd" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 6H8v12h8V6zm4 16H4V2h16v20z"></path></svg>',
  grok: '<svg fill="currentColor" fill-rule="evenodd" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815"></path></svg>',
  t3: '<svg fill="currentColor" viewBox="15.5309 37 94.3941 56.96" xmlns="http://www.w3.org/2000/svg"><path d="M33.4509 93V47.56H15.5309V37H64.3309V47.56H46.4109V93H33.4509ZM86.7253 93.96C82.832 93.96 78.9653 93.4533 75.1253 92.44C71.2853 91.3733 68.032 89.88 65.3653 87.96L70.4053 78.04C72.5386 79.5867 75.0186 80.8133 77.8453 81.72C80.672 82.6267 83.5253 83.08 86.4053 83.08C89.6586 83.08 92.2186 82.44 94.0853 81.16C95.952 79.88 96.8853 78.12 96.8853 75.88C96.8853 73.7467 96.0586 72.0667 94.4053 70.84C92.752 69.6133 90.0853 69 86.4053 69H80.4853V60.44L96.0853 42.76L97.5253 47.4H68.1653V37H107.365V45.4L91.8453 63.08L85.2853 59.32H89.0453C95.9253 59.32 101.125 60.8667 104.645 63.96C108.165 67.0533 109.925 71.0267 109.925 75.88C109.925 79.0267 109.099 81.9867 107.445 84.76C105.792 87.48 103.259 89.6933 99.8453 91.4C96.432 93.1067 92.0586 93.96 86.7253 93.96Z"></path></svg>',
} as const;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const clamp01 = (v: number) => clamp(v, 0, 1);
const easeInOut = (p: number) =>
  p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2;
const easeBack = (p: number) => 1 + 2.1 * (p - 1) ** 3 + 1.1 * (p - 1) ** 2;
const idle = (fn) =>
  window.requestIdleCallback
    ? window.requestIdleCallback(fn, { timeout: 3000 })
    : window.setTimeout(fn, 300);
const cancelIdle = (id) =>
  window.cancelIdleCallback
    ? window.cancelIdleCallback(id)
    : window.clearTimeout(id);

const ORB_FILTER_DEFS =
  '<filter id="lp-ball-shade" x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB"><feFlood flood-color="#000" flood-opacity="0.1" result="s0f"/><feGaussianBlur in="SourceAlpha" stdDeviation="4"/><feOffset dx="0" dy="-5"/><feComponentTransfer><feFuncA type="table" tableValues="1 0.8785 0.817 0.7696 0.73 0.6956 0.6649 0.6372 0.6118 0.5884 0.5666 0.5463 0.5271 0.5091 0.492 0.4757 0.4603 0.4456 0.4315 0.4181 0.4052 0.3928 0.3809 0.3694 0.3584 0.3477 0.3374 0.3275 0.3179 0.3086 0.2996 0.2909 0.2825 0.2743 0.2663 0.2586 0.2512 0.2439 0.2368 0.2299 0.2233 0.2168 0.2104 0.2043 0.1983 0.1925 0.1868 0.1812 0.1758 0.1706 0.1654 0.1605 0.1556 0.1508 0.1462 0.1417 0.1373 0.133 0.1288 0.1247 0.1207 0.1168 0.113 0.1093 0.1056 0.1021 0.0987 0.0953 0.092 0.0888 0.0857 0.0826 0.0797 0.0768 0.0739 0.0712 0.0685 0.0659 0.0633 0.0608 0.0584 0.056 0.0537 0.0514 0.0492 0.0471 0.045 0.043 0.041 0.0391 0.0373 0.0354 0.0337 0.032 0.0303 0.0287 0.0271 0.0256 0.0242 0.0227 0.0214 0.02 0.0187 0.0175 0.0163 0.0151 0.014 0.0129 0.0119 0.0109 0.01 0.0091 0.0082 0.0074 0.0066 0.0058 0.0051 0.0044 0.0038 0.0032 0.0027 0.0022 0.0017 0.0013 0.0009 0.0006 0.0003 0.0001 0"/></feComponentTransfer><feComposite in="s0f" operator="in" result="s0"/><feComposite in="s0" in2="SourceGraphic" operator="atop" result="g0"/><feFlood flood-color="#000" flood-opacity="0.14" result="s1f"/><feGaussianBlur in="SourceAlpha" stdDeviation="9"/><feOffset dx="4" dy="16"/><feComponentTransfer><feFuncA type="table" tableValues="1 0.8609 0.794 0.7435 0.7017 0.6658 0.6341 0.6055 0.5796 0.5557 0.5337 0.5131 0.4939 0.4758 0.4588 0.4427 0.4274 0.4129 0.399 0.3858 0.3732 0.3611 0.3495 0.3384 0.3277 0.3174 0.3075 0.298 0.2888 0.2799 0.2713 0.263 0.255 0.2472 0.2397 0.2324 0.2254 0.2185 0.2119 0.2054 0.1992 0.1931 0.1872 0.1815 0.1759 0.1705 0.1652 0.1601 0.1551 0.1503 0.1456 0.141 0.1365 0.1322 0.1279 0.1238 0.1198 0.1159 0.1121 0.1084 0.1048 0.1012 0.0978 0.0945 0.0912 0.088 0.085 0.0819 0.079 0.0762 0.0734 0.0707 0.068 0.0655 0.063 0.0605 0.0581 0.0558 0.0536 0.0514 0.0493 0.0472 0.0452 0.0432 0.0413 0.0395 0.0377 0.0359 0.0342 0.0326 0.031 0.0294 0.0279 0.0264 0.025 0.0237 0.0223 0.021 0.0198 0.0186 0.0174 0.0163 0.0152 0.0142 0.0132 0.0122 0.0113 0.0104 0.0096 0.0087 0.008 0.0072 0.0065 0.0058 0.0052 0.0046 0.004 0.0035 0.003 0.0025 0.0021 0.0017 0.0013 0.001 0.0007 0.0004 0.0002 0.0001 0"/></feComponentTransfer><feComposite in="s1f" operator="in" result="s1"/><feComposite in="s1" in2="g0" operator="atop" result="g1"/></filter><filter id="lp-ball-shade-dark" x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB"><feFlood flood-color="#fff" flood-opacity="0.12" result="s0f"/><feMorphology in="SourceAlpha" operator="erode" radius="1"/><feComponentTransfer><feFuncA type="table" tableValues="1 0"/></feComponentTransfer><feComposite in="s0f" operator="in" result="s0"/><feComposite in="s0" in2="SourceGraphic" operator="atop" result="g0"/><feFlood flood-color="#000" flood-opacity="0.15" result="s1f"/><feGaussianBlur in="SourceAlpha" stdDeviation="4"/><feOffset dx="0" dy="-5"/><feComponentTransfer><feFuncA type="table" tableValues="1 0.8785 0.817 0.7696 0.73 0.6956 0.6649 0.6372 0.6118 0.5884 0.5666 0.5463 0.5271 0.5091 0.492 0.4757 0.4603 0.4456 0.4315 0.4181 0.4052 0.3928 0.3809 0.3694 0.3584 0.3477 0.3374 0.3275 0.3179 0.3086 0.2996 0.2909 0.2825 0.2743 0.2663 0.2586 0.2512 0.2439 0.2368 0.2299 0.2233 0.2168 0.2104 0.2043 0.1983 0.1925 0.1868 0.1812 0.1758 0.1706 0.1654 0.1605 0.1556 0.1508 0.1462 0.1417 0.1373 0.133 0.1288 0.1247 0.1207 0.1168 0.113 0.1093 0.1056 0.1021 0.0987 0.0953 0.092 0.0888 0.0857 0.0826 0.0797 0.0768 0.0739 0.0712 0.0685 0.0659 0.0633 0.0608 0.0584 0.056 0.0537 0.0514 0.0492 0.0471 0.045 0.043 0.041 0.0391 0.0373 0.0354 0.0337 0.032 0.0303 0.0287 0.0271 0.0256 0.0242 0.0227 0.0214 0.02 0.0187 0.0175 0.0163 0.0151 0.014 0.0129 0.0119 0.0109 0.01 0.0091 0.0082 0.0074 0.0066 0.0058 0.0051 0.0044 0.0038 0.0032 0.0027 0.0022 0.0017 0.0013 0.0009 0.0006 0.0003 0.0001 0"/></feComponentTransfer><feComposite in="s1f" operator="in" result="s1"/><feComposite in="s1" in2="g0" operator="atop" result="g1"/><feFlood flood-color="#fff" flood-opacity="0.1" result="s2f"/><feGaussianBlur in="SourceAlpha" stdDeviation="9"/><feOffset dx="4" dy="16"/><feComponentTransfer><feFuncA type="table" tableValues="1 0.8609 0.794 0.7435 0.7017 0.6658 0.6341 0.6055 0.5796 0.5557 0.5337 0.5131 0.4939 0.4758 0.4588 0.4427 0.4274 0.4129 0.399 0.3858 0.3732 0.3611 0.3495 0.3384 0.3277 0.3174 0.3075 0.298 0.2888 0.2799 0.2713 0.263 0.255 0.2472 0.2397 0.2324 0.2254 0.2185 0.2119 0.2054 0.1992 0.1931 0.1872 0.1815 0.1759 0.1705 0.1652 0.1601 0.1551 0.1503 0.1456 0.141 0.1365 0.1322 0.1279 0.1238 0.1198 0.1159 0.1121 0.1084 0.1048 0.1012 0.0978 0.0945 0.0912 0.088 0.085 0.0819 0.079 0.0762 0.0734 0.0707 0.068 0.0655 0.063 0.0605 0.0581 0.0558 0.0536 0.0514 0.0493 0.0472 0.0452 0.0432 0.0413 0.0395 0.0377 0.0359 0.0342 0.0326 0.031 0.0294 0.0279 0.0264 0.025 0.0237 0.0223 0.021 0.0198 0.0186 0.0174 0.0163 0.0152 0.0142 0.0132 0.0122 0.0113 0.0104 0.0096 0.0087 0.008 0.0072 0.0065 0.0058 0.0052 0.0046 0.004 0.0035 0.003 0.0025 0.0021 0.0017 0.0013 0.001 0.0007 0.0004 0.0002 0.0001 0"/></feComponentTransfer><feComposite in="s2f" operator="in" result="s2"/><feComposite in="s2" in2="g1" operator="atop" result="g2"/></filter><filter id="lp-ball-shade-glass" x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB"><feFlood flood-color="#000" flood-opacity="0.035" result="s0f"/><feMorphology in="SourceAlpha" operator="erode" radius="1"/><feComponentTransfer><feFuncA type="table" tableValues="1 0"/></feComponentTransfer><feComposite in="s0f" operator="in" result="s0"/><feComposite in="s0" in2="SourceGraphic" operator="atop" result="g0"/><feFlood flood-color="#000" flood-opacity="0.04" result="s1f"/><feGaussianBlur in="SourceAlpha" stdDeviation="4"/><feOffset dx="0" dy="-5"/><feComponentTransfer><feFuncA type="table" tableValues="1 0.8785 0.817 0.7696 0.73 0.6956 0.6649 0.6372 0.6118 0.5884 0.5666 0.5463 0.5271 0.5091 0.492 0.4757 0.4603 0.4456 0.4315 0.4181 0.4052 0.3928 0.3809 0.3694 0.3584 0.3477 0.3374 0.3275 0.3179 0.3086 0.2996 0.2909 0.2825 0.2743 0.2663 0.2586 0.2512 0.2439 0.2368 0.2299 0.2233 0.2168 0.2104 0.2043 0.1983 0.1925 0.1868 0.1812 0.1758 0.1706 0.1654 0.1605 0.1556 0.1508 0.1462 0.1417 0.1373 0.133 0.1288 0.1247 0.1207 0.1168 0.113 0.1093 0.1056 0.1021 0.0987 0.0953 0.092 0.0888 0.0857 0.0826 0.0797 0.0768 0.0739 0.0712 0.0685 0.0659 0.0633 0.0608 0.0584 0.056 0.0537 0.0514 0.0492 0.0471 0.045 0.043 0.041 0.0391 0.0373 0.0354 0.0337 0.032 0.0303 0.0287 0.0271 0.0256 0.0242 0.0227 0.0214 0.02 0.0187 0.0175 0.0163 0.0151 0.014 0.0129 0.0119 0.0109 0.01 0.0091 0.0082 0.0074 0.0066 0.0058 0.0051 0.0044 0.0038 0.0032 0.0027 0.0022 0.0017 0.0013 0.0009 0.0006 0.0003 0.0001 0"/></feComponentTransfer><feComposite in="s1f" operator="in" result="s1"/><feComposite in="s1" in2="g0" operator="atop" result="g1"/><feFlood flood-color="#1c2024" flood-opacity="0.18" result="s2f"/><feGaussianBlur in="SourceAlpha" stdDeviation="9"/><feOffset dx="4" dy="16"/><feComponentTransfer><feFuncA type="table" tableValues="1 0.8609 0.794 0.7435 0.7017 0.6658 0.6341 0.6055 0.5796 0.5557 0.5337 0.5131 0.4939 0.4758 0.4588 0.4427 0.4274 0.4129 0.399 0.3858 0.3732 0.3611 0.3495 0.3384 0.3277 0.3174 0.3075 0.298 0.2888 0.2799 0.2713 0.263 0.255 0.2472 0.2397 0.2324 0.2254 0.2185 0.2119 0.2054 0.1992 0.1931 0.1872 0.1815 0.1759 0.1705 0.1652 0.1601 0.1551 0.1503 0.1456 0.141 0.1365 0.1322 0.1279 0.1238 0.1198 0.1159 0.1121 0.1084 0.1048 0.1012 0.0978 0.0945 0.0912 0.088 0.085 0.0819 0.079 0.0762 0.0734 0.0707 0.068 0.0655 0.063 0.0605 0.0581 0.0558 0.0536 0.0514 0.0493 0.0472 0.0452 0.0432 0.0413 0.0395 0.0377 0.0359 0.0342 0.0326 0.031 0.0294 0.0279 0.0264 0.025 0.0237 0.0223 0.021 0.0198 0.0186 0.0174 0.0163 0.0152 0.0142 0.0132 0.0122 0.0113 0.0104 0.0096 0.0087 0.008 0.0072 0.0065 0.0058 0.0052 0.0046 0.004 0.0035 0.003 0.0025 0.0021 0.0017 0.0013 0.001 0.0007 0.0004 0.0002 0.0001 0"/></feComponentTransfer><feComposite in="s2f" operator="in" result="s2"/><feComposite in="s2" in2="g1" operator="atop" result="g2"/></filter>';

/* Original face engine: sphere-mounted glyphs, eye/mouth animation,
   pointer look, blinks and the baked brand silhouettes. */
const createPlanetFaces = (options = {}) => {
  const DEFAULTS = {
    // what the mark does: 'nose', 'eyes', 'smile' (it leads the name
    // round the arc) or 'hide'. A planet whose mark makes a poor eye
    // (a wordmark) opts out with data-mark-eyes="false" and keeps pills
    mark: "nose",
    // the pupils: 'pill' (upright capsule) or 'dot'; their width, how
    // tall a pill is (times its width), and, when the eyes are the
    // mark, the mark's size; then their distance from the middle and
    // their height, each as a share of the ball's radius (up is negative)
    eyeShape: "pill",
    eye: 0.18,
    eyeTall: 1.7,
    eyeMark: 0.34,
    eyeX: 0.3,
    eyeY: -0.2,
    // the smile: the circle the glyphs stand on and its lowest point,
    // as shares of the radius
    mouthR: 0.5,
    mouthY: 0.55,
    // a short name is spaced out to this arc, a long one scaled down
    // to that (degrees)
    minSpan: 75,
    maxSpan: 150,
    // where the nose lands, as a share of the radius
    noseY: 0.1,
    // the face's expression: 'happy' (the smile), 'straight' (the name
    // on a line) or 'thinking' (the mouth pulled to one side, one eye
    // narrowed, the head tilted); a change tweens over expressMs
    expression: "happy",
    expressMs: 340,
    // how far the head turns towards the pointer (degrees, at most);
    // past about 25 the far end of a long smile reaches the rim, and a
    // look up is held short so the eyes stay clear of the bubble
    turn: 24,
    turnUp: 4,
    blink: true,
    // without a pointer the head looks about on its own
    wander: true,
    inMs: 700,
    outMs: 520,
    // the ball itself: 'ball' keeps the disc; 'shape' lets the mark's
    // silhouette take it over while the face is on (the mark drawn
    // filled, its holes filled and its gaps bridged, then softened: a
    // bump or a tip for each of the mark's, none of its detail).
    // shapeClose is the notch it bridges and shapeRound the tip it
    // rounds, each a radius as a share of the mark's size (more than a
    // little rounding erodes a thin ray away); shapeSoft how many waves
    // round the outline survive after that (60: smooth sides, round
    // tips); shapeSize scales it (1 keeps the disc's area); shapeMix
    // how far from the disc it goes. A planet overrides the first four
    // with data-shape-close, -round, -soft and -size, takes its shape
    // from a template lp-shape-<icon> when the page has one, and keeps
    // the disc with data-shape="false"; so does a host with no
    // .lp-orb-skin
    body: "ball",
    // the shapes baked ahead of time, by the planet's icon (the lab's
    // exportShapes() writes them): when given, nothing is traced on the
    // page, and a planet missing from them keeps its disc
    shapes: null,
    shapeClose: 0.02,
    shapeRound: 0.015,
    shapeSoft: 60,
    shapeSize: 1,
    shapeMix: 1,
    reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
  const settings = { ...DEFAULTS, ...options.settings };
  /* an expression: how the mouth lies, how open each eye is, and the
     head's tilt (degrees, a roll). The mouth is the name: 'smile' puts
     it on the smile's circle, 'frown' on the same circle turned over,
     'flat' on a line, 'hmm' on a line that rises to one side, shifted
     that way */
  const EXPRESSIONS = {
    happy: { mouth: "smile", lids: [1, 1], tilt: 0 },
    straight: { mouth: "flat", lids: [1, 1], tilt: 0 },
    thinking: { mouth: "hmm", lids: [0.5, 1], tilt: -6 },
  };
  const faces = new Set();
  let pointer = null;
  let frame = 0;
  let last = null;
  const recent = [];
  let copies = 0;

  const RAD = 180 / Math.PI;
  /* the wander: where a face with no pointer looks at a time, as the
     look's x and y */
  const wanderAt = (seed, ms) => {
    const t = ms / 1000 + seed;
    return [
      0.55 * Math.sin(t * 0.71) * Math.cos(t * 0.23),
      0.4 * Math.sin(t * 0.47 + 1.3),
    ];
  };
  /* the head's turn, rotateX(-pitch) rotateY(yaw), as one axis and
     angle for the rotate property (the product of the two half-angle
     quaternions); the transform keeps the tilt, which rotate composes
     outside of, so the matrix is the old transform's exactly */
  const lookRotate = (yaw, pitch) => {
    // the old transform wrote its angles to three places, so these start
    // from the same numbers
    const a = (Number((-pitch).toFixed(3)) * Math.PI) / 360;
    const b = (Number(yaw.toFixed(3)) * Math.PI) / 360;
    const x = Math.sin(a) * Math.cos(b);
    const y = Math.cos(a) * Math.sin(b);
    const z = Math.sin(a) * Math.sin(b);
    const s = Math.hypot(x, y, z);
    if (s < 1e-7) {
      return "1 0 0 0deg";
    }
    const angle = 2 * Math.atan2(s, Math.cos(a) * Math.cos(b)) * RAD;
    return `${(x / s).toFixed(9)} ${(y / s).toFixed(9)} ${(z / s).toFixed(9)} ${angle.toFixed(7)}deg`;
  };
  const lookAngles = (gx, gy, on) => [
    gx * settings.turn * on,
    Math.max(gy * settings.turn, -settings.turnUp) * on,
  ];
  /* a settled face's wander on the compositor: the same curve sampled
     every 100 ms for twenty seconds (linear steps stay within a fiftieth
     of a degree of it), delayed by the look's own easing, from this
     frame; the frame starts the next stretch when one ends */
  const WANDER_SPAN = 20_000;
  const WANDER_STEP = 100;
  const WANDER_LAG = 80;
  function wake() {
    if (!frame && !document.hidden) {
      last = null;
      frame = requestAnimationFrame(tick);
    }
  }
  const startWander = (face, now) => {
    const keyframes = [];
    for (let ms = 0; ms <= WANDER_SPAN; ms += WANDER_STEP) {
      const [gx, gy] = wanderAt(face.seed, now + ms - WANDER_LAG);
      const [yaw, pitch] = lookAngles(gx, gy, 1);
      keyframes.push({
        offset: ms / WANDER_SPAN,
        rotate: lookRotate(yaw, pitch),
      });
    }
    const anim = face.box.animate(keyframes, {
      duration: WANDER_SPAN,
      fill: "forwards",
    });
    anim.startTime = now;
    anim.onfinish = wake;
    face.wanderAnim = anim;
  };
  /* a pill's blink on the compositor: its lid closes and opens on the
     frame's curve (1 - 0.94 sin(pi p) over 150 ms, sampled every 7.5 ms)
     from where it stands, then holds open until the next blink replaces
     it (an animation that ends costs main-thread frames of its own). The
     frame drops the hold whenever it writes the eyes, and finishes a
     blink itself when the lids are moving (an expression's tween) */
  const BLINK_MS = 150;
  const BLINK_HOLD = 6000;
  const BLINK = Array.from(
    { length: 21 },
    (_, i) => 1 - 0.94 * Math.sin((Math.PI * i) / 20)
  );
  const blinkLids = (face) => {
    for (const [i, eye] of face.eyes.entries()) {
      const v = clamp01((face.e - 0.5) / 0.35) * face.lids[i];
      eye.blink?.cancel();
      const keyframes = BLINK.map((k, j) => ({
        offset: (j * BLINK_MS) / 20 / BLINK_HOLD,
        transform: `scaleY(${(v * k).toFixed(3)})`,
      }));
      keyframes.push({ offset: 1, transform: `scaleY(${v.toFixed(3)})` });
      eye.blink = eye.lid.animate(keyframes, { duration: BLINK_HOLD });
      eye.blink.startTime = face.blinkAt;
    }
  };
  const blinking = (face) =>
    face.eyes.some((eye) => eye.blink && eye.blink.currentTime < BLINK_MS);
  const dropBlinks = (face) => {
    face.eyes.forEach((eye) => {
      eye.blink?.cancel();
      eye.blink = null;
    });
  };
  const stopWander = (face, now, dt) => {
    face.wanderAnim.cancel();
    face.wanderAnim = null;
    // the look carries on from where the wander had it a frame ago, as
    // this frame eases it one more step
    const [gx, gy] = wanderAt(face.seed, now - WANDER_LAG - dt);
    face.gx = gx;
    face.gy = gy;
    face.rotateWritten = "";
  };

  /* the frame: runs while a face moves, sleeps otherwise; a pointer
     move, a blink's timer, a change of settings or a talk wakes it */
  function awake() {
    for (const face of faces) {
      if (!face.rest && face.visible) {
        return true;
      }
    }
    return false;
  }
  function tick(now) {
    frame = 0;
    // a frame after a sleep steps as the frames before it did when the
    // look was moving all along, on the compositor
    const woke = last === null;
    let dt = 16;
    if (last !== null) {
      dt = Math.min(now - last, 100);
      recent.push(dt);
      if (recent.length > 8) {
        recent.shift();
      }
    } else if (recent.length && [...faces].some((face) => face.wanderAnim)) {
      // the shortest of the last few, so one long frame does not count
      dt = Math.min(...recent);
    }
    last = now;
    // the planets' places come from the pointer and scroll events and a
    // read after each frame, when layout is clean; a frame reads one
    // itself (a forced style pass, before any write) only when it has
    // none, or for a face out of view, whose frames are rare
    let follow = false;
    faces.forEach((face) => {
      if (face.orb.isConnected) {
        if (
          (face.far || !face.visible) &&
          face.to === 1 &&
          (face.e !== face.to || now - face.start < face.dur)
        ) {
          // the flags are from the observer's last notice: check them
          // before a morph is skipped, or shown whole on its way back in
          const r = face.orb.getBoundingClientRect();
          face.far =
            r.bottom < -innerHeight / 2 ||
            r.top > innerHeight * 1.5 ||
            r.right < -innerWidth / 2 ||
            r.left > innerWidth * 1.5;
          if (!face.far && face.e === 1 && now - face.start < face.dur) {
            // it formed at once while far, but is back before its morph
            // would have ended: the clock takes it from there
            face.e = face.from;
          }
        }
        if (pointer && !face.rest) {
          // a frame after a sleep reads an old place too: the planet may
          // have moved while nothing ran
          if (
            !face.rect ||
            (!face.visible && now - face.rectAt > 400) ||
            (woke && now - face.rectAt > 100)
          ) {
            face.rect = face.orb.getBoundingClientRect();
            face.rectAt = now;
          }
          follow ||= face.visible;
        }
      } else {
        // its planet left the page
        faces.delete(face);
        byOrb.delete(face.orb);
        inView.unobserve(face.orb);
      }
    });
    if (follow && !refreshing) {
      refreshing = true;
      after.port2.postMessage(0);
    }
    let busy = false;
    faces.forEach((face) => {
      if (face.frame(now, dt)) {
        busy = true;
      }
    });
    if (busy && !document.hidden) {
      frame = requestAnimationFrame(tick);
    }
  }
  const nudge = () => {
    if (awake()) {
      wake();
    }
  };
  /* the talking planets' places, read in the input and scroll events:
     they run before the frame's animation callbacks, while style is
     usually still clean, so the read seldom costs a style pass */
  const measure = () => {
    const at = performance.now();
    faces.forEach((face) => {
      if (!face.rest && face.visible && face.orb.isConnected) {
        face.rect = face.orb.getBoundingClientRect();
        face.rectAt = at;
      }
    });
  };
  // the places read again once a frame is done and layout is clean; a
  // planet that moved wakes the frame, so its head follows it
  let refreshing = false;
  const after = new MessageChannel();
  after.port1.onmessage = () => {
    refreshing = false;
    const before = new Map([...faces].map((face) => [face, face.rect]));
    measure();
    for (const face of faces) {
      const was = before.get(face);
      const { rect } = face;
      if (
        was &&
        rect &&
        was !== rect &&
        (Math.abs(was.left - rect.left) > 0.5 ||
          Math.abs(was.top - rect.top) > 0.5 ||
          Math.abs(was.width - rect.width) > 0.5)
      ) {
        wake();
        break;
      }
    }
  };
  // a finger lifts without leaving, so it never sets the look
  const onMove = (event) => {
    if (event.pointerType === "touch") {
      return;
    }
    pointer = { x: event.clientX, y: event.clientY };
    if (awake()) {
      measure();
      wake();
    }
  };
  // a scroll keeps the places fresh; the heads re-aim at the next frame
  // that runs anyway, as they always did
  const onScroll = () => {
    if (pointer && awake()) {
      measure();
    }
    // a face that formed at once far out of view may be scrolled back
    // in before its morph would have ended: the frame checks, before it
    // paints
    const at = performance.now();
    for (const face of faces) {
      if (
        !face.visible &&
        face.to === 1 &&
        face.e === 1 &&
        at - face.start < face.dur
      ) {
        wake();
        break;
      }
    }
  };
  const onLeave = () => {
    pointer = null;
    nudge();
  };
  const onUp = (event) => {
    if (event.pointerType !== "mouse") {
      pointer = null;
      nudge();
    }
  };
  /* a face out of view does not form, look about, blink or tween to a
     new expression: nobody would see it, and each would cost frames */
  const byOrb = new Map();
  const inView = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const face = byOrb.get(entry.target);
      if (!face) {
        return;
      }
      face.visible = entry.isIntersecting;
      // far enough out that a frame cannot bring it in before the next
      // notice: half a viewport beyond any edge
      const root = entry.rootBounds;
      const r = entry.boundingClientRect;
      face.far =
        !face.visible &&
        Boolean(root) &&
        (r.bottom < root.top - root.height / 2 ||
          r.top > root.bottom + root.height / 2 ||
          r.right < root.left - root.width / 2 ||
          r.left > root.right + root.width / 2);
      if (face.rest) {
        return;
      }
      window.clearTimeout(face.blinkTimer);
      if (face.visible) {
        // its place as the observer saw it, fresh and free
        face.rect = entry.boundingClientRect;
        face.rectAt = performance.now();
        if (
          face.to === 1 &&
          face.e === 1 &&
          performance.now() - face.start < face.dur
        ) {
          // it formed at once out of view, but its morph would still be
          // running: the clock takes it from there
          face.e = face.from;
          wake();
        }
        if (face.to === 1) {
          // the next blink a little while after it comes into view, and
          // that blink wakes the frame, as a blink always did
          face.nextBlink = performance.now() + 900 + Math.random() * 1600;
          face.blinkTimer = window.setTimeout(
            wake,
            face.nextBlink - performance.now()
          );
        }
      } else if (!pointer) {
        // its wander goes to the compositor at once
        wake();
      }
    });
  });
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true, capture: true });
  window.addEventListener("pointerup", onUp, { passive: true });
  window.addEventListener("pointercancel", onUp, { passive: true });
  document.documentElement.addEventListener("mouseleave", onLeave);
  document.addEventListener("visibilitychange", nudge);

  /* the mark's silhouette, for a ball that takes its shape. The mark is
     drawn filled on a small canvas and stroked wide, which bridges any
     gap narrower than the closing radius; the outside is flooded from
     the border, so what is left is the mark with its holes filled; its
     edge is traced, the stroke's width taken back off, and the outline
     resampled to even steps and kept as a Fourier series, so a softer
     copy is the same series with fewer of its waves. A mark in pieces (a
     wordmark) keeps each piece as a series of its own */
  // enough points that a ray's sides are curves, not facets, and enough
  // waves kept that the softening has died away before the series ends
  // (cut off early, a series ripples along every edge)
  const SHAPE_N = 400;
  const SHAPE_PX = 384;
  const SHAPE_FIT = 0.56;
  const SHAPE_WAVES = 160;
  // the skin's box is this many planets wide, so a tip has room past
  // the disc (the stylesheet's inset on .lp-orb-ball must agree)
  const SHAPE_BOX = 1.5;
  const floodOutside = (mask) => {
    const W = SHAPE_PX;
    const seen = new Uint8Array(mask.length);
    const stack = [];
    const push = (i) => {
      if (!seen[i] && !mask[i]) {
        seen[i] = 1;
        stack.push(i);
      }
    };
    for (let x = 0; x < W; x++) {
      push(x);
      push((W - 1) * W + x);
    }
    for (let y = 0; y < W; y++) {
      push(y * W);
      push(y * W + W - 1);
    }
    while (stack.length) {
      const i = stack.pop();
      const x = i % W;
      if (x > 0) {
        push(i - 1);
      }
      if (x < W - 1) {
        push(i + 1);
      }
      if (i >= W) {
        push(i - W);
      }
      if (i < mask.length - W) {
        push(i + W);
      }
    }
    for (let i = 0; i < mask.length; i++) {
      mask[i] = seen[i] ? 0 : 1;
    }
  };
  /* the edges between a filled pixel and an empty one, chained into
     loops with the filled side always to the same hand; the vertices
     are the pixel corners */
  const outline = (mask) => {
    const W = SHAPE_PX;
    const V = W + 1;
    const at = (x, y) =>
      x < 0 || y < 0 || x >= W || y >= W ? 0 : mask[y * W + x];
    const next = new Map();
    const add = (a, b) => {
      const list = next.get(a);
      if (list) {
        list.push(b);
      } else {
        next.set(a, [b]);
      }
    };
    for (let y = 0; y < W; y++) {
      for (let x = 0; x < W; x++) {
        if (!mask[y * W + x]) {
          continue;
        }
        if (!at(x, y - 1)) {
          add(y * V + x, y * V + x + 1);
        }
        if (!at(x + 1, y)) {
          add(y * V + x + 1, (y + 1) * V + x + 1);
        }
        if (!at(x, y + 1)) {
          add((y + 1) * V + x + 1, (y + 1) * V + x);
        }
        if (!at(x - 1, y)) {
          add((y + 1) * V + x, y * V + x);
        }
      }
    }
    const loops = [];
    next.forEach((_, start) => {
      let list = next.get(start);
      if (!list || !list.length) {
        return;
      }
      const loop = [];
      let v = start;
      while (true) {
        list = next.get(v);
        if (!list || !list.length) {
          break;
        }
        loop.push([v % V, Math.floor(v / V)]);
        v = list.pop();
        if (v === start) {
          break;
        }
      }
      if (loop.length > 2) {
        loops.push(loop);
      }
    });
    return loops;
  };
  const area = (pts) => {
    let a = 0;
    for (let i = 0; i < pts.length; i++) {
      const [x0, y0] = pts[i];
      const [x1, y1] = pts[(i + 1) % pts.length];
      a += x0 * y1 - x1 * y0;
    }
    return a / 2;
  };
  /* the loops worth keeping: the biggest and any other at least a
     twentieth of it (a wordmark is more than one piece), biggest first */
  const loopsOf = (loops) => {
    const sized = loops
      .map((loop) => ({ loop, a: Math.abs(area(loop)) }))
      .filter((l) => l.a > 0)
      .sort((p, q) => q.a - p.a);
    if (!sized.length) {
      return null;
    }
    return sized.filter((l) => l.a >= sized[0].a / 20).map((l) => l.loop);
  };
  const perimeter = (loop) => {
    let total = 0;
    for (let i = 0; i < loop.length; i++) {
      const a = loop[i];
      const b = loop[(i + 1) % loop.length];
      total += Math.hypot(b[0] - a[0], b[1] - a[1]);
    }
    return total;
  };
  const resample = (loop, n) => {
    const along = [0];
    for (let i = 0; i < loop.length; i++) {
      const a = loop[i];
      const b = loop[(i + 1) % loop.length];
      along.push(along[i] + Math.hypot(b[0] - a[0], b[1] - a[1]));
    }
    const total = along[loop.length];
    const out = [];
    let j = 0;
    for (let k = 0; k < n; k++) {
      const s = (total * k) / n;
      while (j + 1 < loop.length && along[j + 1] <= s) {
        j++;
      }
      const a = loop[j];
      const b = loop[(j + 1) % loop.length];
      const seg = along[j + 1] - along[j];
      const t = seg > 0 ? (s - along[j]) / seg : 0;
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
    return out;
  };
  const series = (pts) => {
    const n = pts.length;
    const waves = Math.min(SHAPE_WAVES, Math.floor(n / 2) - 1);
    const re = new Float64Array(2 * waves + 1);
    const im = new Float64Array(2 * waves + 1);
    for (let k = -waves; k <= waves; k++) {
      let sr = 0;
      let si = 0;
      for (let j = 0; j < n; j++) {
        const a = (-2 * Math.PI * k * j) / n;
        const [x, y] = pts[j];
        sr += x * Math.cos(a) - y * Math.sin(a);
        si += x * Math.sin(a) + y * Math.cos(a);
      }
      re[k + waves] = sr / n;
      im[k + waves] = si / n;
    }
    return { re, im, n, waves };
  };
  const traceMark = (svg, closeK, roundK) => {
    const view = (svg.getAttribute("viewBox") || "")
      .trim()
      .split(/[\s,]+/)
      .map(Number);
    const [vx, vy, vw, vh] =
      view.length === 4 && view.every((n) => Number.isFinite(n))
        ? view
        : [0, 0, 24, 24];
    const canvas = document.createElement("canvas");
    canvas.width = SHAPE_PX;
    canvas.height = SHAPE_PX;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      return null;
    }
    const f = (SHAPE_PX * SHAPE_FIT) / Math.max(vw, vh);
    const r = Math.max(0, closeK) * SHAPE_PX * SHAPE_FIT;
    const round = Math.max(0, roundK) * SHAPE_PX * SHAPE_FIT;
    ctx.setTransform(
      f,
      0,
      0,
      f,
      SHAPE_PX / 2 - (vx + vw / 2) * f,
      SHAPE_PX / 2 - (vy + vh / 2) * f
    );
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#000";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    let drew = false;
    svg.querySelectorAll("path").forEach((el) => {
      const d = el.getAttribute("d");
      if (!d || el.closest("defs, clipPath, mask")) {
        return;
      }
      const path = new Path2D(d);
      const own = (name, fallback) =>
        el.getAttribute(name) ?? svg.getAttribute(name) ?? fallback;
      const fill = own("fill", "#000");
      const stroke = own("stroke", "none");
      const width = Number.parseFloat(own("stroke-width", "1")) || 1;
      ctx.save();
      const move = /translate\(\s*([-\d.]+)[\s,]+([-\d.]+)/.exec(
        el.getAttribute("transform") || ""
      );
      if (move) {
        ctx.translate(Number(move[1]), Number(move[2]));
      }
      if (fill !== "none") {
        ctx.fill(
          path,
          own("fill-rule", "nonzero") === "evenodd" ? "evenodd" : "nonzero"
        );
        drew = true;
      }
      // the stroke is in the mark's units: the closing radius over the
      // scale (a width of nothing is not a width canvas takes)
      const wide = (stroke === "none" ? 0 : width) + (2 * r) / f;
      if (wide > 0) {
        ctx.lineWidth = wide;
        ctx.stroke(path);
        drew = true;
      }
      ctx.restore();
    });
    if (!drew) {
      return null;
    }
    const read = () => {
      const { data } = ctx.getImageData(0, 0, SHAPE_PX, SHAPE_PX);
      const mask = new Uint8Array(SHAPE_PX * SHAPE_PX);
      for (let i = 0; i < mask.length; i++) {
        mask[i] = data[i * 4 + 3] > 127 ? 1 : 0;
      }
      return mask;
    };
    // the outlines drawn again, grown by a stroke round them or shrunk
    // by one taken out of them, and traced again
    const redraw = (loops, grow) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, SHAPE_PX, SHAPE_PX);
      const closed = new Path2D();
      loops.forEach((loop) => {
        loop.forEach(([x, y], i) =>
          i ? closed.lineTo(x, y) : closed.moveTo(x, y)
        );
        closed.closePath();
      });
      ctx.fill(closed);
      if (grow) {
        ctx.globalCompositeOperation =
          grow > 0 ? "source-over" : "destination-out";
        ctx.lineWidth = 2 * Math.abs(grow);
        ctx.stroke(closed);
        ctx.globalCompositeOperation = "source-over";
      }
      return loopsOf(outline(read()));
    };
    const mask = read();
    floodOutside(mask);
    let loops = loopsOf(outline(mask));
    if (loops && r > 0) {
      // the stroke's width off again: what it bridged stays bridged
      loops = redraw(loops, -r);
    }
    if (loops && round > 0) {
      // the tips rounded: anything thinner than the radius goes, and
      // what is left grows back by as much
      loops = redraw(loops, -round);
      if (loops) {
        loops = redraw(loops, round);
      }
    }
    if (!loops) {
      return null;
    }
    // the points shared out by length, each piece getting a few at least
    const lengths = loops.map(perimeter);
    const total = lengths.reduce((sum, l) => sum + l, 0);
    return loops.map((loop, i) =>
      series(
        resample(loop, Math.max(24, Math.round((SHAPE_N * lengths[i]) / total)))
      )
    );
  };
  /* the shape at a softness: each piece's series summed with every wave
     past the soft one weighted down, all of them centred on their area
     and scaled to the disc's (times size), in radii, and joined into one
     outline: each further piece spliced into the first at the closest
     pair of points, there and back along one line, which adds no area.
     For the morph, each point also keeps where it stands on the disc and
     how far it goes from there */
  const shapeAt = (pieces, soft, size) => {
    const loops = pieces.map((ser) => {
      const pts = [];
      for (let j = 0; j < ser.n; j++) {
        let x = 0;
        let y = 0;
        for (let k = -ser.waves; k <= ser.waves; k++) {
          const w = Math.exp(-((k / Math.max(soft, 0.5)) ** 2));
          if (w < 1e-4) {
            continue;
          }
          const a = (2 * Math.PI * k * j) / ser.n;
          const cr = ser.re[k + ser.waves];
          const ci = ser.im[k + ser.waves];
          x += w * (cr * Math.cos(a) - ci * Math.sin(a));
          y += w * (cr * Math.sin(a) + ci * Math.cos(a));
        }
        pts.push([x, y]);
      }
      return pts;
    });
    let total = 0;
    let cx = 0;
    let cy = 0;
    for (const pts of loops) {
      total += area(pts);
      for (let i = 0; i < pts.length; i++) {
        const [x0, y0] = pts[i];
        const [x1, y1] = pts[(i + 1) % pts.length];
        const c = x0 * y1 - x1 * y0;
        cx += (x0 + x1) * c;
        cy += (y0 + y1) * c;
      }
    }
    if (!total) {
      return null;
    }
    cx /= 6 * total;
    cy /= 6 * total;
    // the disc's area times size, held inside the skin's box with the
    // morph's overshoot (easeBack peaks near 1.045) and a little to spare,
    // so no ray is ever cut flat at the box's edge
    let reach = 0;
    for (const pts of loops) {
      for (const [x, y] of pts) {
        reach = Math.max(reach, Math.abs(x - cx), Math.abs(y - cy));
      }
    }
    const s = Math.min(
      size * Math.sqrt(Math.PI / Math.abs(total)),
      (SHAPE_BOX * 0.98) / 1.05 / (reach || 1)
    );
    const scaled = loops.map((pts) =>
      pts.map(([x, y]) => [(x - cx) * s, (y - cy) * s])
    );
    let seq = scaled[0];
    scaled.slice(1).forEach((loop) => {
      let best = Number.POSITIVE_INFINITY;
      let bi = 0;
      let bj = 0;
      seq.forEach((p, i) => {
        loop.forEach((q, j) => {
          const d = (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2;
          if (d < best) {
            best = d;
            bi = i;
            bj = j;
          }
        });
      });
      seq = [
        ...seq.slice(0, bi + 1),
        ...loop.slice(bj),
        ...loop.slice(0, bj),
        loop[bj],
        seq[bi],
        ...seq.slice(bi + 1),
      ];
    });
    return seq.map(([x, y]) => {
      const r = Math.hypot(x, y) || 1;
      return { cx: x / r, cy: y / r, dx: x - x / r, dy: y - y / r };
    });
  };
  const clipAt = (poly, m) => {
    const k = 50 / SHAPE_BOX;
    let s = "";
    for (let i = 0; i < poly.length; i++) {
      const p = poly[i];
      s += `${i ? "," : ""}${(50 + k * (p.cx + p.dx * m)).toFixed(2)}% ${(50 + k * (p.cy + p.dy * m)).toFixed(2)}%`;
    }
    return `polygon(${s})`;
  };

  /* a baked shape: points in thousandths of the radius, the first one
     whole and each after it as a step from the one before ("x,y dx,dy
     ..."), which keeps the string short; read into the morph's points */
  const fromBaked = (text) => {
    let x = 0;
    let y = 0;
    const out = [];
    text
      .trim()
      .split(/\s+/)
      .forEach((pair) => {
        const [a, b] = pair.split(",").map(Number);
        x += a;
        y += b;
        const px = x / 1000;
        const py = y / 1000;
        const r = Math.hypot(px, py) || 1;
        out.push({ cx: px / r, cy: py / r, dx: px - px / r, dy: py - py / r });
      });
    return out.length > 2 ? out : null;
  };
  /* a copy of the mark for an eye, its gradient ids made its own */
  const copyMark = (svg) => {
    const nextCopies = copies + 1;
    copies = nextCopies;
    const suffix = `-e${nextCopies}`;
    const holder = document.createElement("span");
    holder.className = "lp-eye-mark";
    holder.innerHTML = svg.outerHTML
      .replaceAll(/id="([^"]+)"/g, `id="$1${suffix}"`)
      .replaceAll(/url\(#([^)]+)\)/g, `url(#$1${suffix})`);
    return holder;
  };
  /* a feature's place on the sphere: longitude and latitude (radians)
     from where it should appear on the face when the head is straight,
     x to the right and y down, as shares of the radius */
  const onSphere = (x, y) => {
    const lat = Math.asin(clamp(y, -0.96, 0.96));
    const lon = Math.asin(clamp(x / Math.cos(lat), -0.96, 0.96));
    return { lon, lat };
  };
  const place = (lon, lat, roll = 0) =>
    `rotateY(${(lon * RAD).toFixed(3)}deg) rotateX(${(-lat * RAD).toFixed(3)}deg) translateZ(calc(var(--s) / 2))${roll ? ` rotateZ(${(roll * RAD).toFixed(3)}deg)` : ""}`;

  const createFace = (orb, ring) => {
    const items = [...ring.querySelectorAll(".lp-orb-item")].map((item) => ({
      el: item,
      glyph: item.firstElementChild,
      a:
        (Number.parseFloat(item.style.getPropertyValue("--a")) * Math.PI) / 180,
      lon: 0,
      lat: 0,
      roll: 0,
      scale: 1,
    }));
    const mark = items[0];
    const letters = items.slice(1);
    const markSvg = mark?.glyph.querySelector("svg");
    // the ball's skin, when the host has one: the layer the shape clips;
    // and the shape's source, a template of its own or the mark
    const skin = orb.querySelector(".lp-orb-skin");
    const shapeSvg =
      document.getElementById(`lp-shape-${orb.dataset.icon}`)?.content
        ?.firstElementChild ?? markSvg;
    // a planet's own values for the shape, over the settings
    const shapeSetting = (key) => {
      const own = Number.parseFloat(orb.dataset[key] ?? "");
      return Number.isFinite(own) ? own : settings[key];
    };
    // the face box: one box in the ring holding the glyphs (moved in)
    // and the eyes; the look turns it. Each eye is a zero-size box on
    // the sphere, a lid (the blink), a pupil holding a capsule of two
    // round caps and a bar, and a copy of the mark for when the eyes
    // are the mark
    const box = document.createElement("div");
    box.className = "lp-face";
    items.forEach((item) => box.append(item.el));
    const eyes = [-1, 1].map((side) => {
      const eye = document.createElement("div");
      eye.className = "lp-eye";
      const lid = document.createElement("div");
      lid.className = "lp-eye-lid";
      const pupil = document.createElement("div");
      pupil.className = "lp-eye-pupil";
      const capA = document.createElement("i");
      capA.className = "lp-eye-cap";
      const bar = document.createElement("i");
      bar.className = "lp-eye-bar";
      const capB = document.createElement("i");
      capB.className = "lp-eye-cap";
      pupil.append(capA, bar, capB);
      let markEl = null;
      if (markSvg) {
        markEl = copyMark(markSvg);
        pupil.append(markEl);
      }
      lid.append(pupil);
      eye.append(lid);
      box.append(eye);
      return { side, el: eye, lid, pupil, capA, bar, capB, markEl };
    });
    ring.append(box);

    const face = {
      orb,
      ring,
      box,
      eyes,
      rect: null,
      arc: letters,
      nose: { lon: 0, lat: 0 },
      marks: false,
      // the mark's outline as a series, and the shape the ball takes, each
      // with the settings it was made for, and the idle task making them
      series: null,
      seriesClose: null,
      poly: null,
      polyKey: null,
      shapeTask: 0,
      shaped: false,
      expression: settings.expression,
      // the expression's targets, the ones before, and the tween between
      goal: null,
      prior: null,
      x: 1,
      xStart: 0,
      lids: [1, 1],
      tilt: 0,
      e: 0,
      to: 0,
      from: 0,
      start: 0,
      dur: 0,
      rest: true,
      // what the last frame wrote, to skip the writes nothing changed
      written: -1,
      blinkWritten: 1,
      xWritten: -1,
      dirty: true,
      // the look, smoothed, and the head's own wander
      gx: 0,
      gy: 0,
      seed: Math.random() * 1000,
      nextBlink: 0,
      blinkAt: -1e9,
      blinkTimer: 0,
      rectAt: 0,
      visible: true,
      far: false,
      // the compositor's wander, and what the frame last wrote
      wanderAnim: null,
      wanderFrom: null,
      rotateWritten: "",
      tiltWritten: "",
    };

    /* the face's geometry: each glyph's arc position on the equator
       (its angle, which is its arc length over the radius) becomes its
       position on the smile's circle, the word centred at the bottom,
       and that becomes a place on the sphere; a short word is spaced
       out to the least arc, a long one scaled down to the most. The
       eyes and the nose get their places on the sphere too, and the
       eyes their shape, all in terms of the host's --s */
    const layout = () => {
      face.dirty = true;
      face.marks =
        settings.mark === "eyes" &&
        Boolean(markSvg) &&
        orb.dataset.markEyes !== "false";
      box.style.setProperty(
        "--lp-eye-d",
        `calc(var(--s) * ${(settings.eye / 2).toFixed(4)})`
      );
      box.style.setProperty(
        "--lp-eye-mark",
        `calc(var(--s) * ${(settings.eyeMark / 2).toFixed(4)})`
      );
      box.classList.toggle("is-marks", face.marks);
      const tall = settings.eyeShape === "pill" ? settings.eyeTall : 1;
      // the caps sit half the bar apart: the bar is (tall - 1) pupil
      // widths, a pupil width is eye * --s / 2
      const half = (settings.eye * (tall - 1)) / 4;
      eyes.forEach((eye) => {
        const { lon, lat } = onSphere(eye.side * settings.eyeX, settings.eyeY);
        eye.el.style.transform = place(lon, lat);
        eye.capA.style.transform = `translateY(calc(var(--s) * ${(-half).toFixed(4)}))`;
        eye.capB.style.transform = `translateY(calc(var(--s) * ${half.toFixed(4)}))`;
        eye.bar.style.transform = `scaleY(${(tall - 1).toFixed(3)})`;
      });
      face.nose = onSphere(0, settings.noseY);
      face.arc =
        settings.mark === "smile" && mark ? [mark, ...letters] : letters;
      if (!wantsShape()) {
        face.poly = null;
        face.polyKey = null;
        unshape();
      } else if (face.polyKey !== shapeKey() && settings.shapes) {
        prepareShape();
      } else if (face.polyKey !== shapeKey() && !face.shapeTask) {
        // the shape it has stays until the new one is ready
        face.shapeTask = idle(prepareShape);
      }
      face.goal = aim(face.expression);
      face.prior = face.goal;
      face.x = 1;
    };

    /* the ball's shape: traced from the mark (or its own template) and
       softened, made in an idle moment after attach or a change of
       settings, or at once when a talk starts before that */
    // back to the plain disc: no clip, no shaped class
    const unshape = () => {
      if (skin) {
        skin.style.clipPath = "";
        skin.parentElement.classList.remove("is-shaped");
      }
      face.shaped = false;
    };
    const baked = () => settings.shapes?.[orb.dataset.icon];
    const wantsShape = () =>
      settings.body === "shape" &&
      Boolean(skin) &&
      orb.dataset.shape !== "false" &&
      (settings.shapes ? Boolean(baked()) : Boolean(shapeSvg));
    const shapeKey = () =>
      settings.shapes
        ? `baked:${baked()?.length}`
        : ["shapeClose", "shapeRound", "shapeSoft", "shapeSize"]
            .map(shapeSetting)
            .join(":");
    const prepareShape = () => {
      face.shapeTask = 0;
      if (!wantsShape() || face.polyKey === shapeKey()) {
        return;
      }
      if (settings.shapes) {
        // baked: read, nothing traced
        face.poly = fromBaked(baked());
        face.polyKey = shapeKey();
        face.dirty = true;
        if (!face.rest) {
          wake();
        }
        return;
      }
      const traced = `${shapeSetting("shapeClose")}:${shapeSetting("shapeRound")}`;
      if (!face.series || face.seriesClose !== traced) {
        face.series = traceMark(
          shapeSvg,
          shapeSetting("shapeClose"),
          shapeSetting("shapeRound")
        );
        face.seriesClose = traced;
      }
      face.poly = face.series
        ? shapeAt(
            face.series,
            shapeSetting("shapeSoft"),
            shapeSetting("shapeSize")
          )
        : null;
      face.polyKey = shapeKey();
      // a face already on takes the new shape at its next frame
      face.dirty = true;
      if (!face.rest) {
        wake();
      }
    };

    /* where the mouth's glyphs, the lids and the tilt go for an
       expression. Each glyph's arc position on the equator (its angle,
       which is its arc length over the radius) becomes its position
       along the mouth, the word centred; on the smile a short word is
       spaced out to the least arc and a long one scaled down to the
       most, on a line a long word is scaled to fit the face */
    const aim = (name) => {
      const expr = EXPRESSIONS[name] ?? EXPRESSIONS.happy;
      const { arc } = face;
      const r = settings.mouthR;
      const yc = settings.mouthY - r;
      const out = { items: [], lids: expr.lids, tilt: expr.tilt };
      if (!arc.length) {
        return out;
      }
      const pos = arc.map((l) => l.a);
      const first = pos[0];
      const final = pos.at(-1);
      const centre = (first + final) / 2;
      const step = arc.length > 1 ? (final - first) / (arc.length - 1) : 0;
      const extent = final - first + step;
      let offsets = pos.map((p) => p - centre);
      let scale = 1;
      if (expr.mouth === "smile" || expr.mouth === "frown") {
        const span = extent / r;
        const min = (settings.minSpan * Math.PI) / 180;
        const max = (settings.maxSpan * Math.PI) / 180;
        if (span < min && extent > 0) {
          offsets = offsets.map((q) => (q * (min * r)) / extent);
        } else if (span > max) {
          scale = max / span;
          offsets = offsets.map((q) => q * scale);
        }
        // a frown is the smile's own circle turned over: its centre sits
        // above the mouth instead of below, so the word keeps its middle
        // where it was and bows its ends down. The glyphs follow the
        // tangent either way, so the roll turns over with it
        const down = expr.mouth === "frown";
        const mid = down ? settings.mouthY + r : yc;
        out.items = offsets.map((q) => {
          const psi = q / r;
          const y = down ? mid - r * Math.cos(psi) : mid + r * Math.cos(psi);
          return {
            ...onSphere(r * Math.sin(psi), y),
            roll: down ? psi : -psi,
            scale,
          };
        });
        return out;
      }
      // a line across the lower face, held short of the rim (shorter
      // still when it sits to one side)
      const width = expr.mouth === "hmm" ? 0.88 : 0.98;
      if (extent > width) {
        scale = width / extent;
        offsets = offsets.map((q) => q * scale);
      }
      const flatY = settings.mouthY - 0.1;
      if (expr.mouth === "flat") {
        out.items = offsets.map((q) => ({
          ...onSphere(q, flatY),
          roll: 0,
          scale,
        }));
        return out;
      }
      // 'hmm': the line rises to the right and sits a little that way
      const slope = -0.24;
      const shift = 0.07;
      const roll = Math.atan(slope);
      out.items = offsets.map((q) => {
        const x = q * Math.cos(roll) + shift;
        return {
          ...onSphere(x, flatY + 0.02 + slope * (x - shift)),
          roll,
          scale,
        };
      });
      return out;
    };

    /* another expression, tweened from wherever the face is now */
    /* the targets as they stand now, between the prior and the goal */
    const current = () => {
      const k = easeInOut(face.x);
      const mix = (a, b) => a + (b - a) * k;
      return {
        items: face.goal.items.map((g, i) => {
          const o = face.prior.items[i] ?? g;
          return {
            lon: mix(o.lon, g.lon),
            lat: mix(o.lat, g.lat),
            roll: mix(o.roll, g.roll),
            scale: mix(o.scale, g.scale),
          };
        }),
        lids: [
          mix(face.prior.lids[0], face.goal.lids[0]),
          mix(face.prior.lids[1], face.goal.lids[1]),
        ],
        tilt: mix(face.prior.tilt, face.goal.tilt),
      };
    };

    const restore = () => {
      items.forEach(({ el, glyph }) => {
        el.style.transform = "";
        glyph.style.transform = "";
        glyph.style.opacity = "";
      });
      face.wanderAnim?.cancel();
      face.wanderAnim = null;
      face.wanderFrom = null;
      dropBlinks(face);
      box.style.transform = "";
      box.style.rotate = "";
      unshape();
      face.rotateWritten = "";
      face.tiltWritten = "";
      box.classList.remove("is-on");
      window.clearTimeout(face.blinkTimer);
      face.rest = true;
      // nothing the last talk wrote stands now: the next talk's first
      // frame writes it all again (a talk that forms at once, under
      // reduced motion, would otherwise match the memo and write nothing)
      face.written = -1;
      face.xWritten = -1;
      face.blinkWritten = -1;
    };

    face.set = (on) => {
      const to = on ? 1 : 0;
      if (face.to === to) {
        return;
      }
      if (
        face.to === 1 &&
        face.e === 1 &&
        performance.now() - face.start < face.dur
      ) {
        // it formed at once out of view: it turns back from where its
        // morph would be
        face.e =
          face.from +
          (1 - face.from) *
            easeBack(clamp01((performance.now() - face.start) / face.dur));
      }
      if (on && wantsShape() && face.polyKey !== shapeKey()) {
        // a talk before the idle moment came: the shape is made now
        cancelIdle(face.shapeTask);
        prepareShape();
      }
      face.to = to;
      face.from = face.e;
      face.start = performance.now();
      face.dur = on ? settings.inMs : settings.outMs;
      window.clearTimeout(face.blinkTimer);
      if (on) {
        box.classList.add("is-on");
        face.rest = false;
        face.nextBlink = face.start + 1800 + Math.random() * 1600;
      }
      wake();
    };
    face.detach = () => {
      cancelIdle(face.shapeTask);
      face.shapeTask = 0;
      restore();
      items.forEach((item) => ring.append(item.el));
      box.remove();
      faces.delete(face);
      byOrb.delete(orb);
      inView.unobserve(orb);
    };

    face.frame = (now, dt) => {
      // the morph; a face forming far out of view goes straight to where
      // it is going (one unwinding always unwinds: it may be on its way
      // back into view)
      if (face.e !== face.to) {
        if (
          settings.reduceMotion ||
          face.dur <= 0 ||
          (face.far && face.to === 1)
        ) {
          face.e = face.to;
        } else {
          const p = clamp01((now - face.start) / face.dur);
          const k = face.to > face.from ? easeBack(p) : easeInOut(p);
          face.e = p >= 1 ? face.to : face.from + (face.to - face.from) * k;
        }
      }
      const { e } = face;
      if (e <= 0 && face.to === 0) {
        if (!face.rest) {
          restore();
        }
        return false;
      }
      const on = clamp01(e);
      // the expression's tween
      if (face.x < 1) {
        const p = clamp01((now - face.xStart) / settings.expressMs);
        face.x = p >= 1 ? 1 : p;
      }
      if (face.x < 1 || face.dirty) {
        const stand = current();
        stand.items.forEach((t, i) => {
          const l = face.arc[i];
          l.lon = t.lon;
          l.lat = t.lat;
          l.roll = t.roll;
          l.scale = t.scale;
        });
        face.lids = stand.lids;
        face.tilt = stand.tilt;
      }

      // where to look: the pointer, from the ball's centre, saturating a
      // few radii out; or, with no pointer, a slow wander; eased so a
      // jump of the pointer is a glance, not a snap. A settled face with
      // no pointer wanders on the compositor instead (startWander)
      const wandering = !pointer && settings.wander && !settings.reduceMotion;
      // the compositor takes over once the look has eased onto the wander
      // (half a second, six of its time constants), so a pointer leaving
      // still glides back into it
      if (!wandering) {
        face.wanderFrom = null;
      } else if (face.wanderFrom === null) {
        face.wanderFrom = now;
      }
      // out of view it hands over at once (nobody sees a glide) and keeps
      // wandering there, which costs the main thread nothing
      const settled = wandering && face.to === 1 && e === 1;
      const free = settled && (!face.visible || now - face.wanderFrom >= 500);
      if (
        face.wanderAnim &&
        (!settled || face.wanderAnim.playState === "finished")
      ) {
        stopWander(face, now, dt);
      }
      if (free && !face.wanderAnim) {
        startWander(face, now);
      }
      let looking = false;
      if (!face.wanderAnim) {
        let tx = 0;
        let ty = 0;
        if (pointer && face.rect) {
          const R = face.rect.width / 2;
          const dx = pointer.x - (face.rect.left + R);
          const dy = pointer.y - (face.rect.top + R);
          const dist = Math.hypot(dx, dy);
          if (dist > 0.5) {
            const k = dist / (dist + 2.5 * R);
            tx = (dx / dist) * k;
            ty = (dy / dist) * k;
          }
        } else if (settings.wander && !settings.reduceMotion) {
          [tx, ty] = wanderAt(face.seed, now);
        }
        // out of view the look snaps to its target on frames that run
        // anyway, and keeps nothing awake
        looking =
          face.visible &&
          (Math.abs(tx - face.gx) > 0.0005 || Math.abs(ty - face.gy) > 0.0005);
        if (looking) {
          const ease = 1 - Math.exp(-dt / 80);
          face.gx += (tx - face.gx) * ease;
          face.gy += (ty - face.gy) * ease;
        } else {
          face.gx = tx;
          face.gy = ty;
        }
        // the head turns towards the look: yaw to the side, pitch up or
        // down (a positive rotateX lifts the front, so the pitch is
        // signed the other way; a look up is held short), both held back
        // while the face is still forming
        const [yaw, pitch] = lookAngles(face.gx, face.gy, on);
        const rotate = lookRotate(yaw, pitch);
        if (rotate !== face.rotateWritten) {
          box.style.rotate = rotate;
          face.rotateWritten = rotate;
        }
      }
      const tilt = `rotateZ(${(face.tilt * on).toFixed(3)}deg)`;
      if (tilt !== face.tiltWritten) {
        box.style.transform = tilt;
        face.tiltWritten = tilt;
      }

      // a blink now and then, once the face is there: pills on the
      // compositor (blinkLids), a mark-eye by the frame
      let blink = 1;
      let midBlink = false;
      if (
        settings.blink &&
        !settings.reduceMotion &&
        face.visible &&
        face.to === 1 &&
        e >= 0.95
      ) {
        if (now >= face.nextBlink) {
          face.blinkAt = now;
          face.nextBlink = now + 2600 + Math.random() * 3200;
          if (!face.marks && face.x >= 1) {
            blinkLids(face);
          }
        }
        const bp = (now - face.blinkAt) / BLINK_MS;
        if ((face.marks || !blinking(face)) && bp >= 0 && bp < 1) {
          blink = 1 - 0.94 * Math.sin(Math.PI * bp);
          midBlink = true;
        }
      } else if (blinking(face)) {
        // a blink stops the moment it may not run, as it always did
        dropBlinks(face);
        face.blinkWritten = -1;
      }

      // the features move with the morph and the blink only; a frame
      // that changed neither writes nothing here
      const shapeSame =
        e === face.written && face.x === face.xWritten && !face.dirty;
      const eyesSame = shapeSame && blink === face.blinkWritten;
      face.written = e;
      face.blinkWritten = blink;
      face.xWritten = face.x;
      face.dirty = false;
      if (!shapeSame) {
        // the ball: the disc gives way to the mark's shape as the face
        // forms, on the same curve, and back
        if (face.poly) {
          // shaped only while it is off the disc: the stylesheet gives a
          // shaped ball its filter, the plain disc its own shadows
          if (e > 0 !== face.shaped) {
            skin.parentElement.classList.toggle("is-shaped", e > 0);
            face.shaped = e > 0;
          }
          skin.style.clipPath =
            e > 0 ? clipAt(face.poly, settings.shapeMix * e) : "";
        }
        // the glyphs slide over the sphere from the equator to the arc,
        // rolling into the curve on the way
        face.arc.forEach((l) => {
          const lon = l.a + (l.lon - l.a) * e;
          l.el.style.transform = place(lon, l.lat * e, l.roll * e);
          l.glyph.style.opacity = "";
          l.glyph.style.transform =
            l.scale === 1
              ? ""
              : `translate(-50%, -50%) scale(${(1 + (l.scale - 1) * on).toFixed(3)})`;
        });
        // the mark: down the sphere as a nose, or gone by the time the
        // eyes open (as the smile's lead it went round with the glyphs)
        if (mark && settings.mark !== "smile") {
          if (settings.mark === "nose") {
            mark.el.style.transform = place(
              mark.a * (1 - e),
              face.nose.lat * e
            );
            mark.glyph.style.transform = `translate(-50%, -50%) scale(${(1 - 0.2 * on).toFixed(3)})`;
            mark.glyph.style.opacity = "";
          } else {
            // a fade, at its own size (Cameron: no scaling on the way out)
            const k = clamp01(1 - e / 0.02);
            mark.el.style.transform = "";
            mark.glyph.style.opacity = k.toFixed(3);
            mark.glyph.style.transform = "";
          }
        }
      }
      if (!eyesSame) {
        // the eyes open once the smile is mostly there: a pill as a lid
        // (scaled from a line), a mark by a clip from its middle, so it
        // is never squashed; they stay where they are and look straight
        // ahead, the head does the turning
        const open = clamp01((e - 0.5) / 0.35);
        eyes.forEach((eye, i) => {
          const v = open * blink * face.lids[i];
          if (face.marks && eye.markEl) {
            if (eye.blink) {
              // a pill's blink or hold would scale the mark
              eye.blink.cancel();
              eye.blink = null;
            }
            eye.lid.style.transform = "";
            eye.pupil.style.transform = "";
            eye.markEl.style.clipPath = `inset(${(50 * (1 - v)).toFixed(1)}% 0)`;
          } else {
            if (eye.markEl) {
              eye.markEl.style.clipPath = "";
            }
            if (eye.blink && eye.blink.currentTime >= BLINK_MS) {
              // the blink is over: its hold would mask this write
              eye.blink.cancel();
              eye.blink = null;
            }
            eye.lid.style.transform = `scaleY(${v.toFixed(3)})`;
            eye.pupil.style.transform = `scale(${(0.5 + 0.5 * open).toFixed(3)})`;
          }
        });
      }

      // still moving? Otherwise the frame sleeps: a pointer move or a
      // change wakes it, and the next blink by its timer
      const moving =
        e !== face.to ||
        looking ||
        (wandering && face.visible && !face.wanderAnim) ||
        midBlink ||
        face.x < 1;
      if (
        !moving &&
        settings.blink &&
        !settings.reduceMotion &&
        face.visible &&
        face.to === 1
      ) {
        window.clearTimeout(face.blinkTimer);
        face.blinkTimer = window.setTimeout(
          wake,
          Math.max(0, face.nextBlink - now)
        );
      }
      return moving;
    };

    layout();
    return face;
  };

  return {
    attach: (orb, ring) => {
      const face = createFace(orb, ring);
      faces.add(face);
      byOrb.set(orb, face);
      inView.observe(orb);
      return face;
    },
    destroy: () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", nudge);
      [...faces].forEach((face) => face.detach());
      inView.disconnect();
      after.port1.close();
      cancelAnimationFrame(frame);
      frame = 0;
    },
  };
};
/* The planets' shapes, baked ahead of time so the page traces nothing:
   createPlanetFaces with body: 'shape' and no shapes given traces each
   mark itself, and its exportShapes() writes them out as these, points
   in thousandths of the radius, each a step from the last. T3 Code has
   none, a wordmark makes no planet, so it keeps its disc */
const LANDING_SHAPES = {
  chatgpt:
    "-246,-1018 18,-2 20,-1 21,-1 20,0 21,0 21,0 21,1 20,1 19,2 18,3 17,3 17,5 15,5 15,6 15,6 14,7 15,6 14,7 14,7 13,8 13,8 13,8 13,8 13,8 12,9 12,8 14,8 15,5 17,3 18,0 17,-2 18,-3 17,-4 18,-3 19,-3 19,-1 21,0 20,0 20,1 19,2 18,3 18,3 17,4 17,4 16,5 16,5 15,6 15,7 14,7 14,6 14,7 13,8 14,7 13,8 13,8 13,8 12,8 11,10 10,11 10,11 10,12 10,11 10,10 11,11 10,11 9,11 9,12 9,12 9,12 9,12 8,13 7,14 7,14 7,14 6,15 6,15 5,16 4,16 5,17 3,18 4,17 3,18 2,19 1,20 0,21 0,20 0,21 -1,20 -2,19 -2,18 -1,18 3,16 5,14 8,13 9,12 9,12 10,11 9,12 9,12 8,13 8,13 7,13 9,13 8,13 8,13 7,14 6,15 6,15 5,15 5,16 5,16 5,16 4,17 4,17 3,18 2,19 3,18 2,18 0,19 -1,18 -3,18 -3,18 -2,18 -4,17 -3,18 -4,17 -4,17 -5,15 -6,16 -6,14 -6,15 -7,15 -7,14 -7,14 -8,13 -8,12 -9,13 -8,12 -9,13 -9,11 -10,11 -11,10 -10,11 -11,10 -10,12 -9,11 -10,11 -11,10 -13,8 -13,8 -13,8 -13,8 -13,8 -14,7 -14,7 -14,6 -15,6 -15,6 -16,6 -14,7 -11,10 -8,13 -5,16 -4,16 -4,17 -6,15 -6,15 -7,14 -7,14 -7,14 -8,13 -9,12 -8,13 -9,12 -8,13 -9,12 -8,13 -9,11 -10,11 -11,10 -12,10 -11,10 -11,9 -12,10 -11,9 -12,9 -12,9 -12,9 -13,8 -14,7 -15,6 -15,6 -14,7 -15,6 -14,7 -15,6 -16,4 -17,5 -17,3 -19,3 -19,2 -18,2 -19,3 -18,2 -19,0 -18,-1 -18,-3 -18,-3 -18,-3 -17,-3 -18,-3 -17,-4 -17,-5 -15,-5 -15,-6 -15,-6 -14,-7 -14,-7 -14,-7 -14,-7 -14,-7 -13,-8 -12,-9 -11,-9 -12,-10 -12,-9 -13,-7 -15,-7 -17,-3 -18,-1 -18,2 -17,3 -17,5 -17,3 -19,3 -19,1 -21,0 -21,0 -20,0 -20,-1 -19,-3 -17,-3 -17,-4 -17,-5 -16,-5 -15,-5 -16,-5 -16,-5 -15,-6 -15,-6 -14,-7 -14,-7 -14,-7 -12,-9 -12,-8 -12,-10 -12,-9 -11,-10 -12,-9 -12,-9 -11,-9 -11,-11 -10,-11 -9,-11 -10,-11 -10,-12 -9,-11 -9,-13 -8,-12 -8,-14 -7,-13 -8,-13 -8,-14 -7,-14 -6,-14 -6,-15 -5,-16 -6,-15 -4,-17 -4,-16 -4,-18 -3,-18 -2,-19 -1,-19 -1,-21 0,-21 0,-21 1,-20 1,-20 2,-19 1,-18 0,-16 -3,-16 -7,-13 -8,-13 -8,-13 -9,-12 -10,-11 -9,-12 -9,-11 -9,-12 -10,-12 -8,-12 -8,-13 -7,-14 -7,-14 -7,-14 -7,-15 -6,-15 -5,-15 -5,-16 -5,-17 -4,-16 -4,-17 -3,-18 -3,-18 -2,-18 -2,-19 -1,-18 1,-18 3,-18 2,-19 2,-19 3,-18 4,-17 4,-17 5,-16 4,-17 5,-16 6,-15 6,-14 7,-14 7,-15 7,-14 7,-13 7,-14 8,-14 8,-13 8,-12 9,-12 10,-11 10,-11 10,-11 11,-10 11,-10 11,-10 12,-9 11,-10 11,-10 12,-9 12,-8 13,-8 14,-8 13,-7 14,-8 14,-7 14,-7 15,-6 14,-6 14,-7 12,-9 10,-11 7,-14 6,-15 6,-15 5,-16 6,-15 6,-15 6,-14 8,-14 7,-14 7,-14 8,-13 8,-13 9,-12 9,-11 10,-12 10,-11 9,-11 10,-11 10,-11 11,-11 11,-9 13,-8 12,-9 13,-8 12,-9 13,-8 12,-9 14,-7 14,-7 15,-6 15,-6 15,-6 14,-7 15,-6 15,-6 16,-5 16,-4",
  claude:
    "-688,-1314 47,-11 50,5 43,20 35,30 28,39 23,44 21,46 20,45 21,46 21,46 21,45 22,45 22,45 22,44 22,45 23,44 22,44 22,45 23,43 24,42 28,36 32,23 34,4 29,-20 20,-40 12,-53 8,-58 6,-60 6,-61 5,-62 5,-62 5,-61 8,-59 10,-56 14,-53 19,-47 27,-38 35,-25 40,-8 39,11 31,29 19,43 7,53 -1,57 -7,58 -9,57 -10,56 -11,56 -9,57 -9,57 -7,56 -1,53 10,43 24,25 34,2 35,-17 34,-30 30,-35 30,-37 30,-36 31,-36 31,-36 30,-36 31,-36 31,-35 31,-35 33,-34 35,-31 40,-25 44,-13 45,1 41,17 32,31 21,40 9,47 -3,50 -13,48 -21,44 -27,40 -28,37 -30,38 -29,37 -29,38 -28,38 -29,38 -28,38 -28,39 -28,39 -27,38 -24,40 -15,40 0,38 21,29 37,14 49,0 53,-7 54,-11 56,-10 57,-10 57,-9 56,-11 56,-10 58,-7 59,-1 55,7 43,19 25,32 3,38 -18,37 -34,28 -46,21 -51,16 -53,13 -53,13 -55,12 -56,11 -56,10 -52,14 -43,19 -23,27 2,30 29,24 47,15 58,9 61,5 62,5 60,6 57,10 51,15 45,22 38,27 28,33 14,38 -6,38 -25,32 -40,22 -50,13 -54,2 -56,-5 -55,-10 -54,-12 -54,-13 -54,-13 -53,-13 -54,-13 -54,-11 -52,-7 -47,1 -36,14 -16,27 5,33 22,34 30,34 34,32 34,32 35,32 35,32 35,32 34,31 35,32 35,32 34,32 33,33 30,35 22,37 7,35 -12,27 -29,12 -39,-6 -40,-19 -40,-25 -39,-28 -38,-27 -39,-27 -38,-21 -38,-9 -31,10 -18,27 0,38 14,42 21,42 24,42 21,44 12,47 -1,46 -19,38 -36,22 -44,3 -43,-14 -37,-28 -30,-35 -28,-40 -26,-40 -26,-40 -27,-40 -28,-39 -28,-39 -27,-39 -28,-39 -27,-39 -27,-39 -29,-34 -33,-20 -35,1 -28,25 -18,43 -10,56 -6,60 -6,61 -6,61 -6,60 -6,60 -6,61 -6,61 -9,58 -15,50 -26,39 -36,23 -41,6 -39,-13 -30,-30 -17,-44 -5,-52 5,-55 9,-56 10,-56 10,-56 10,-57 10,-57 12,-55 11,-54 10,-54 2,-52 -9,-44 -23,-26 -33,-4 -35,17 -33,30 -29,37 -29,38 -28,38 -28,39 -28,38 -28,39 -29,38 -29,37 -30,37 -32,35 -32,33 -34,33 -35,32 -37,26 -41,14 -40,-3 -28,-22 -9,-35 9,-41 21,-40 28,-38 29,-37 31,-36 30,-37 30,-37 29,-37 28,-38 29,-38 28,-38 26,-40 19,-40 6,-38 -12,-31 -28,-17 -40,1 -41,15 -41,24 -40,26 -39,28 -39,28 -39,27 -40,26 -42,25 -44,22 -47,19 -49,11 -50,-1 -42,-15 -26,-30 -6,-38 15,-38 28,-35 36,-30 39,-28 40,-26 41,-26 41,-25 42,-24 43,-24 44,-23 43,-23 43,-24 41,-25 42,-26 39,-26 36,-28 25,-32 7,-32 -17,-28 -39,-19 -55,-10 -62,-4 -64,-2 -64,-3 -63,-4 -64,-3 -64,-2 -64,-2 -63,-4 -63,-3 -62,-5 -58,-8 -51,-16 -38,-25 -20,-33 2,-35 25,-28 42,-16 53,-5 60,2 61,3 63,4 63,3 64,3 63,3 63,4 62,5 62,4 60,4 56,1 47,-7 32,-19 11,-29 -11,-34 -27,-32 -36,-29 -40,-27 -40,-26 -41,-26 -40,-26 -40,-27 -39,-27 -39,-28 -39,-28 -39,-28 -38,-27 -39,-28 -39,-28 -38,-29 -37,-29 -34,-33 -26,-38 -15,-46 1,-49 16,-43 32,-31 43,-15 47,2 46,14 42,23 39,27 39,28 38,29 38,28 38,30 37,29 37,29 37,30 38,27 39,22 39,10 34,-9 21,-27 4,-41 -11,-44 -19,-45 -24,-42 -24,-42 -26,-42 -25,-41 -25,-41 -25,-42 -24,-43 -24,-42 -23,-44 -20,-45 -16,-47 -5,-49 6,-47 19,-43 29,-35",
  gemini:
    "-31,-1321 20,-6 22,0 19,5 15,12 11,15 8,19 8,19 7,20 6,20 6,20 7,21 6,20 7,19 8,20 7,19 7,19 7,20 8,19 8,19 9,17 8,18 9,18 9,18 9,18 9,17 9,18 9,18 9,17 10,17 10,16 10,16 10,17 11,16 11,16 11,15 11,16 12,15 11,15 12,15 12,14 12,15 12,15 11,16 11,15 12,15 12,14 13,13 14,14 13,14 13,13 13,13 14,13 13,13 14,13 13,13 14,13 14,14 13,13 14,12 14,13 15,11 16,12 15,11 15,12 15,11 16,11 15,11 16,12 15,11 15,11 16,11 17,10 16,10 17,10 16,10 18,9 17,9 18,9 18,9 18,9 17,9 18,9 18,8 19,9 19,7 19,8 19,7 19,8 19,7 20,7 20,7 20,7 19,6 20,7 20,7 20,7 19,7 19,8 16,10 12,15 6,20 0,21 -6,20 -11,15 -16,11 -18,8 -20,7 -19,7 -20,7 -21,6 -20,6 -21,6 -20,6 -20,7 -19,8 -19,8 -19,7 -18,8 -19,8 -18,9 -18,9 -18,9 -17,9 -18,8 -18,9 -18,9 -17,9 -17,10 -17,10 -16,10 -17,10 -17,10 -16,10 -16,11 -15,12 -15,11 -16,11 -15,11 -15,12 -15,12 -15,11 -16,11 -15,11 -15,12 -14,13 -13,13 -14,13 -13,13 -14,13 -13,13 -14,14 -13,13 -13,14 -13,13 -13,14 -13,14 -13,13 -13,14 -13,14 -12,14 -12,15 -11,15 -12,15 -11,15 -12,16 -10,15 -11,16 -12,15 -10,16 -10,17 -10,17 -11,16 -11,15 -11,16 -10,16 -10,17 -9,18 -9,18 -9,17 -8,18 -9,18 -9,18 -9,18 -8,18 -8,19 -7,19 -8,19 -7,19 -8,19 -7,19 -8,20 -6,20 -6,20 -7,21 -6,20 -7,19 -7,20 -8,19 -11,16 -14,11 -20,6 -22,0 -19,-5 -15,-12 -11,-15 -8,-19 -8,-19 -7,-20 -6,-20 -6,-20 -6,-21 -6,-21 -7,-20 -7,-19 -7,-19 -8,-19 -8,-19 -8,-19 -8,-18 -8,-18 -9,-18 -9,-18 -9,-18 -9,-17 -9,-18 -9,-18 -9,-18 -9,-17 -10,-16 -10,-17 -10,-16 -10,-17 -11,-16 -10,-16 -11,-16 -11,-16 -11,-16 -11,-15 -13,-14 -12,-14 -11,-16 -11,-15 -12,-16 -12,-14 -12,-14 -13,-14 -13,-13 -14,-14 -13,-13 -13,-14 -13,-13 -14,-13 -13,-13 -14,-13 -13,-13 -14,-13 -14,-13 -14,-13 -14,-12 -15,-12 -16,-11 -15,-11 -15,-12 -15,-12 -15,-11 -16,-11 -15,-11 -15,-12 -16,-11 -16,-10 -16,-10 -17,-11 -16,-10 -17,-10 -17,-9 -17,-10 -16,-11 -17,-10 -17,-9 -18,-9 -18,-8 -18,-9 -19,-7 -19,-8 -18,-8 -19,-9 -18,-8 -19,-8 -19,-7 -19,-8 -19,-7 -20,-7 -20,-7 -20,-6 -21,-6 -20,-7 -19,-7 -19,-8 -16,-10 -12,-15 -6,-19 0,-22 6,-20 11,-15 16,-11 18,-8 20,-7 19,-7 20,-7 20,-7 20,-6 20,-7 19,-7 20,-7 20,-7 19,-7 19,-8 19,-7 19,-8 19,-8 18,-9 18,-9 17,-8 18,-9 18,-9 18,-9 17,-9 17,-10 17,-9 16,-11 17,-10 17,-10 16,-10 16,-11 15,-11 15,-12 16,-11 15,-11 15,-12 15,-12 15,-11 16,-11 15,-11 15,-12 14,-13 13,-13 14,-13 13,-13 14,-13 13,-13 14,-14 13,-13 13,-14 13,-13 13,-14 13,-14 13,-13 13,-14 12,-14 11,-16 12,-15 11,-15 13,-14 12,-15 11,-15 11,-16 11,-16 11,-15 12,-15 12,-15 10,-16 10,-16 10,-17 11,-16 10,-17 9,-17 9,-18 9,-18 9,-17 8,-18 9,-18 9,-18 9,-18 8,-18 8,-19 7,-19 8,-19 7,-19 8,-19 7,-19 8,-20 6,-20 6,-20 7,-21 6,-19 7,-20 7,-20 8,-19 11,-16",
  opencode:
    "-775,-984 13,-5 16,-2 18,0 17,0 18,0 18,0 18,0 18,0 18,0 18,0 17,0 18,0 18,0 18,0 18,0 18,0 17,0 18,0 18,0 18,0 18,0 18,0 17,0 18,0 18,0 18,0 18,0 18,0 17,0 18,0 18,0 18,0 18,0 18,0 18,0 17,0 18,0 18,0 18,0 18,0 18,0 17,0 18,0 18,0 18,0 18,0 18,0 17,0 18,0 18,0 18,0 18,0 18,0 17,0 18,0 18,0 18,0 18,0 18,0 18,0 17,0 18,0 18,0 18,0 18,0 18,0 17,0 18,0 18,0 18,0 18,0 18,0 17,0 18,0 18,0 18,0 18,0 18,0 18,0 17,0 18,0 18,0 18,0 18,0 17,0 17,1 15,3 12,6 8,10 5,13 1,16 1,17 0,18 0,18 0,18 0,18 0,18 0,17 0,18 0,18 0,18 0,18 0,18 0,17 0,18 0,18 0,18 0,18 0,18 0,18 0,17 0,18 0,18 0,18 0,18 0,18 0,17 0,18 0,18 0,18 0,18 0,18 0,17 0,18 0,18 0,18 0,18 0,18 0,17 0,18 0,18 0,18 0,18 0,18 0,18 0,17 0,18 0,18 0,18 0,18 0,18 0,17 0,18 0,18 0,18 0,18 0,18 0,17 0,18 0,18 0,18 0,18 0,18 0,17 0,18 0,18 0,18 0,18 0,18 0,18 0,17 0,18 0,18 0,18 0,18 0,18 0,17 0,18 0,18 0,18 0,18 0,18 0,17 0,18 0,18 0,18 0,18 0,18 0,18 0,17 0,18 0,18 0,18 0,18 0,18 0,17 0,18 0,18 0,18 0,18 0,18 0,17 0,18 0,18 0,18 0,18 -1,17 -3,15 -5,12 -9,9 -13,5 -16,2 -18,0 -17,0 -18,0 -18,0 -18,0 -18,0 -18,0 -18,0 -17,0 -18,0 -18,0 -18,0 -18,0 -18,0 -17,0 -18,0 -18,0 -18,0 -18,0 -18,0 -17,0 -18,0 -18,0 -18,0 -18,0 -18,0 -17,0 -18,0 -18,0 -18,0 -18,0 -18,0 -18,0 -17,0 -18,0 -18,0 -18,0 -18,0 -18,0 -17,0 -18,0 -18,0 -18,0 -18,0 -18,0 -17,0 -18,0 -18,0 -18,0 -18,0 -18,0 -17,0 -18,0 -18,0 -18,0 -18,0 -18,0 -18,0 -17,0 -18,0 -18,0 -18,0 -18,0 -18,0 -17,0 -18,0 -18,0 -18,0 -18,0 -18,0 -17,0 -18,0 -18,0 -18,0 -18,0 -18,0 -18,0 -17,0 -18,0 -18,0 -18,0 -18,0 -17,0 -17,-1 -15,-3 -12,-6 -8,-10 -5,-13 -1,-16 -1,-17 0,-18 0,-18 0,-18 0,-18 0,-18 0,-17 0,-18 0,-18 0,-18 0,-18 0,-18 0,-17 0,-18 0,-18 0,-18 0,-18 0,-18 0,-18 0,-17 0,-18 0,-18 0,-18 0,-18 0,-18 0,-17 0,-18 0,-18 0,-18 0,-18 0,-18 0,-17 0,-18 0,-18 0,-18 0,-18 0,-18 0,-17 0,-18 0,-18 0,-18 0,-18 0,-18 0,-18 0,-17 0,-18 0,-18 0,-18 0,-18 0,-18 0,-17 0,-18 0,-18 0,-18 0,-18 0,-18 0,-17 0,-18 0,-18 0,-18 0,-18 0,-18 0,-17 0,-18 0,-18 0,-18 0,-18 0,-18 0,-18 0,-17 0,-18 0,-18 0,-18 0,-18 0,-18 0,-17 0,-18 0,-18 0,-18 0,-18 0,-18 0,-17 0,-18 0,-18 0,-18 0,-18 0,-18 0,-18 0,-17 0,-18 0,-18 0,-18 0,-18 0,-18 0,-17 0,-18 0,-18 0,-18 0,-18 0,-18 0,-17 0,-18 0,-18 0,-18 0,-18 1,-17 3,-15 5,-12",
  grok: "-80,-972 19,-3 19,-1 21,0 21,0 20,0 20,1 19,2 18,3 18,3 19,2 19,2 18,3 17,4 17,4 17,4 17,4 17,4 16,5 16,5 16,5 15,6 16,5 15,6 15,6 15,6 15,6 15,6 15,6 14,7 14,7 14,7 14,7 13,8 12,8 13,9 13,8 13,8 13,8 13,7 14,8 14,6 16,6 17,3 20,2 20,1 21,0 21,-1 20,-1 18,-3 16,-4 15,-6 15,-7 14,-6 14,-7 13,-8 12,-9 11,-11 10,-11 10,-11 10,-11 11,-9 12,-9 13,-8 14,-6 15,-2 15,2 13,8 8,12 4,16 1,17 -3,18 -5,16 -5,15 -6,15 -6,15 -5,16 -4,17 -4,17 -4,17 -4,17 -4,17 -4,17 -3,18 -1,20 0,21 -1,21 0,20 0,21 0,21 0,21 0,21 0,21 0,21 0,21 1,21 0,21 1,19 3,19 4,17 4,17 3,17 4,18 3,18 3,18 3,18 3,18 3,18 3,18 3,18 3,18 3,18 1,19 1,21 0,20 0,21 0,21 0,21 0,21 0,21 -2,19 -2,19 -4,17 -3,18 -3,18 -4,17 -3,18 -4,17 -3,18 -4,17 -4,16 -5,17 -5,16 -5,16 -5,16 -5,16 -5,16 -5,16 -6,15 -6,15 -7,14 -7,14 -7,14 -8,13 -8,12 -9,13 -8,13 -9,12 -8,13 -8,12 -9,13 -8,13 -9,12 -9,12 -10,11 -9,11 -10,12 -8,12 -9,12 -10,12 -9,12 -10,11 -10,10 -12,10 -11,10 -11,10 -10,10 -11,11 -11,9 -12,9 -12,9 -12,10 -12,9 -12,8 -13,9 -13,8 -13,8 -12,8 -13,8 -13,9 -13,8 -12,8 -14,8 -13,7 -14,8 -14,7 -14,7 -14,6 -15,7 -15,5 -16,6 -16,4 -16,5 -16,5 -16,6 -15,5 -16,6 -16,4 -17,4 -18,3 -18,3 -18,4 -18,3 -18,2 -18,3 -18,4 -18,2 -20,2 -20,0 -21,0 -21,0 -21,0 -20,0 -20,-2 -18,-2 -18,-4 -18,-3 -18,-2 -18,-3 -17,-4 -17,-4 -17,-4 -17,-5 -17,-4 -16,-4 -16,-5 -16,-6 -15,-6 -15,-6 -14,-6 -15,-6 -15,-6 -15,-7 -14,-7 -14,-7 -14,-7 -13,-7 -14,-7 -14,-7 -15,-7 -14,-7 -13,-7 -13,-9 -12,-8 -13,-9 -12,-8 -13,-9 -13,-8 -13,-7 -14,-7 -16,-6 -16,-4 -18,-3 -20,-2 -20,0 -21,0 -20,1 -19,2 -17,3 -17,5 -16,5 -15,6 -15,6 -16,4 -16,0 -15,-3 -12,-9 -8,-13 -3,-16 0,-18 2,-18 5,-16 5,-16 6,-15 5,-16 4,-16 4,-18 2,-19 0,-20 1,-21 0,-21 0,-21 -1,-20 -1,-20 -3,-18 -4,-17 -4,-17 -5,-17 -5,-16 -5,-15 -6,-15 -6,-15 -6,-15 -6,-15 -6,-15 -5,-16 -5,-17 -3,-17 -4,-18 -3,-17 -4,-17 -3,-18 -4,-17 -3,-18 -3,-18 -2,-19 -1,-20 0,-21 0,-21 0,-21 0,-21 0,-21 0,-21 0,-20 2,-20 2,-19 3,-17 3,-18 3,-19 3,-18 3,-17 3,-18 3,-18 4,-17 5,-17 5,-15 6,-16 5,-15 5,-17 5,-16 5,-16 5,-15 6,-15 7,-15 6,-15 7,-14 7,-14 7,-13 8,-13 9,-13 8,-13 7,-13 8,-13 9,-13 8,-12 9,-13 9,-12 10,-11 9,-11 9,-12 9,-12 9,-12 10,-12 9,-12 10,-11 10,-10 12,-10 11,-10 11,-10 10,-11 10,-11 10,-10 12,-10 12,-9 12,-9 11,-9 12,-9 13,-9 12,-9 11,-9 13,-9 12,-8 12,-9 13,-8 14,-8 14,-7 14,-6 14,-7 14,-7 14,-7 14,-8 14,-6 14,-7 16,-5 16,-5 16,-5 16,-5 17,-4 16,-5 17,-4 17,-4 16,-5 17,-4 17,-4 17,-4 17,-4 17,-4 19,-2 18,-3 18,-3",
};

export default function Orbs({
  className = "min-h-[260px] w-full",
}: OrbsProps) {
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const iconBankRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const iconBank = iconBankRef.current;
    if (!field || !iconBank) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const measureCanvas = document.createElement("canvas");
    const landingMeasure = measureCanvas.getContext("2d");
    let landingDressCopies = 0;

    const landingGrainTurn = (globe, size, turn = LANDING_ORB_TURN) => {
      if (size && globe.querySelector(".lp-orb-ball")) {
        globe.style.setProperty(
          "--lp-grain-turn",
          `${Math.round((turn * LANDING_GRAIN_TILE) / (Math.PI * size))}ms`
        );
      }
    };

    const dressLandingGlobe = (globe, ring, size, turn = LANDING_ORB_TURN) => {
      // React StrictMode double-runs this in dev: clear any items left
      // behind by the previous mount so the ring never accumulates duplicates.
      ring.querySelectorAll(".lp-orb-item").forEach((el) => el.remove());
      const iconKey = globe.dataset.icon;
      const template = iconBank.querySelector(
        `[data-orb-icon="${iconKey}"] svg`
      );
      const label = globe.dataset.label || "";
      if (!template) {
        return false;
      }

      landingGrainTurn(globe, size, turn);
      const nextLandingDressCopies = landingDressCopies + 1;
      landingDressCopies = nextLandingDressCopies;
      const suffix = `-o${nextLandingDressCopies}`;
      const holder = document.createElement("div");
      holder.innerHTML = template.outerHTML
        .replaceAll(/id="([^"]+)"/g, `id="$1${suffix}"`)
        .replaceAll(/url\(#([^)]+)\)/g, `url(#$1${suffix})`);
      const icon = holder.firstElementChild;

      const probe = document.createElement("span");
      probe.className = "lp-orb-glyph";
      probe.textContent = "x";
      ring.append(probe);
      const style = getComputedStyle(probe);
      if (landingMeasure) {
        landingMeasure.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      }
      const type = Number.parseFloat(style.fontSize);
      const tracking = Number.parseFloat(style.letterSpacing) || 0;
      probe.remove();

      const measureText = (value) =>
        landingMeasure?.measureText(value).width ?? value.length * type * 0.58;
      const iconWidth = type * 1.15;
      const items = [{ node: icon, x: 0, w: iconWidth }];
      let x = iconWidth + type * 0.32;

      for (let i = 0; i < label.length; i++) {
        const width = measureText(label[i]) + tracking;
        const advance =
          measureText(label.slice(0, i + 1)) -
          measureText(label.slice(0, i)) +
          tracking;
        const span = document.createElement("span");
        span.textContent = label[i];
        items.push({ node: span, x, w: width });
        x += advance;
      }

      const total = x;
      items.forEach(({ node, x: at, w }) => {
        const item = document.createElement("span");
        item.className = "lp-orb-item";
        const glyph = document.createElement("span");
        glyph.className = "lp-orb-glyph";
        glyph.append(node);
        item.append(glyph);
        const angle = ((at + w / 2 - total / 2) / size) * (360 / Math.PI);
        item.style.setProperty("--a", `${angle}deg`);
        ring.append(item);
      });
      return true;
    };

    const orbs = [...field.querySelectorAll(".lp-orb")]
      .map((orb, index, all) => {
        const ring = orb.querySelector(".lp-orb-ring");
        const size = Number.parseFloat(
          getComputedStyle(orb).getPropertyValue("--s")
        );
        if (!ring || !size || !dressLandingGlobe(orb, ring, size)) {
          return null;
        }
        return {
          orb,
          ring,
          size,
          // Each ring starts at a different angle, then keeps rotating in place.
          angle: reduceMotion ? 0 : (index * 360) / all.length,
          target: null,
          hover: false,
          face: null,
        };
      })
      .filter(Boolean);

    if (!orbs.length) {
      return;
    }

    const faces = createPlanetFaces({
      settings: {
        reduceMotion,
        body: "shape",
        mark: "hide",
        shapes: LANDING_SHAPES,
      },
    });
    orbs.forEach((orb) => {
      orb.face = faces.attach(orb.orb, orb.ring);
      orb.ring.style.transform = `rotateY(${orb.angle}deg)`;
    });

    const setTalking = (orb, active) => {
      orb.orb.classList.toggle("is-talking", active);
      orb.face?.set(active);
    };

    let talk = null;
    const stopTalk = () => {
      if (!talk) {
        return;
      }
      const { orb } = talk;
      talk = null;
      setTalking(orb, false);
      orb.hover = false;
      orb.angle = ((orb.angle % 360) + 360) % 360;
      if (orb.target !== null) {
        orb.target = orb.angle;
      }
    };

    const startTalk = (orb) => {
      if (talk?.orb === orb) {
        return;
      }
      stopTalk();
      orb.hover = true;
      orb.target = Math.round(orb.angle / 360) * 360;
      talk = { orb };
      setTalking(orb, true);
    };

    let lastMove = 0;
    const onFieldMove = () => {
      lastMove = performance.now();
    };
    const onFieldLeave = (event) => {
      if (event.pointerType !== "touch") {
        stopTalk();
      }
    };
    const onEscape = (event) => {
      if (event.key === "Escape" && talk) {
        stopTalk();
      }
    };
    const onOutsideTouch = (event) => {
      if (
        talk &&
        event.pointerType === "touch" &&
        !talk.orb.orb.contains(event.target)
      ) {
        stopTalk();
      }
    };

    field.addEventListener("pointermove", onFieldMove, { passive: true });
    field.addEventListener("pointerleave", onFieldLeave);
    document.addEventListener("keydown", onEscape);
    document.addEventListener("pointerdown", onOutsideTouch);

    const orbListeners = [];
    orbs.forEach((orb) => {
      const onEnter = (event) => {
        if (
          event.pointerType === "touch" ||
          performance.now() - lastMove < 200
        ) {
          startTalk(orb);
        }
      };
      const onMove = () => startTalk(orb);
      const onLeave = (event) => {
        if (event.pointerType !== "touch") {
          stopTalk();
        }
      };
      const onAnimationEnd = (event) => {
        if (event.animationName === "lp-orb-pop") {
          orb.orb.classList.add("is-popped");
        }
      };

      orb.orb.addEventListener("pointerenter", onEnter);
      orb.orb.addEventListener("pointermove", onMove);
      orb.orb.addEventListener("pointerleave", onLeave);
      orb.orb.addEventListener("animationend", onAnimationEnd);
      orbListeners.push(() => {
        orb.orb.removeEventListener("pointerenter", onEnter);
        orb.orb.removeEventListener("pointermove", onMove);
        orb.orb.removeEventListener("pointerleave", onLeave);
        orb.orb.removeEventListener("animationend", onAnimationEnd);
      });
    });

    const apply = () => {
      stopTalk();
      orbs.forEach((orb) => {
        orb.size =
          Number.parseFloat(
            getComputedStyle(orb.orb).getPropertyValue("--s")
          ) || 104;
        landingGrainTurn(orb.orb, orb.size);
        orb.orb.classList.add("is-placed");
      });
    };

    apply();

    const resizeObserver = new ResizeObserver(apply);
    resizeObserver.observe(field);

    let inView = false;
    let frame = 0;
    let last = null;

    // Only the 3D name/logo ring rotates. Orb positions never change.
    const tick = (now) => {
      frame = 0;
      const dt = last === null ? 0 : Math.min(now - last, 100);
      last = now;

      orbs.forEach((orb) => {
        if (orb.target !== null && !orb.hover && (orb.face?.rest ?? true)) {
          orb.target = null;
        }

        if (orb.target === null) {
          orb.angle = (orb.angle + (360 * dt) / LANDING_ORB_TURN) % 360;
        } else {
          const gap = orb.target - orb.angle;
          orb.angle =
            Math.abs(gap) < 0.05
              ? orb.target
              : orb.angle + gap * (1 - Math.exp(-dt / 110));
        }
        orb.ring.style.transform = `rotateY(${orb.angle}deg)`;
      });

      if (inView && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    };

    const sync = () => {
      if (reduceMotion) {
        return;
      }
      if (inView && !document.hidden) {
        if (!frame) {
          last = null;
          frame = requestAnimationFrame(tick);
        }
      } else {
        if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
        if (!inView && talk) {
          stopTalk();
        }
      }
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inView = entry.isIntersecting;
        });
        sync();
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(field);
    document.addEventListener("visibilitychange", sync);

    return () => {
      stopTalk();
      if (frame) {
        cancelAnimationFrame(frame);
      }
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("pointerdown", onOutsideTouch);
      field.removeEventListener("pointermove", onFieldMove);
      field.removeEventListener("pointerleave", onFieldLeave);
      orbListeners.forEach((remove) => remove());
      faces.destroy();
    };
  }, []);

  return (
    <div className={`orb-cosmos w-full ${className}`}>
      <div
        ref={fieldRef}
        className="lp-orbs relative flex flex-wrap items-center content-center justify-center gap-[clamp(16px,2.2vw,28px)] w-full min-h-[260px] px-4 py-12 pointer-events-none"
        aria-hidden="true"
        data-md-exclude=""
      >
        {ORBS.map((orb) => (
          <div
            key={orb.id}
            className={`lp-orb lp-orb--${orb.id}`}
            data-label={orb.label}
            data-icon={orb.icon}
          >
            <div className="lp-orb-body absolute inset-0">
              <div className="lp-orb-globe absolute inset-0 [perspective:calc(var(--s)*5)]">
                <div className="lp-orb-ball">
                  <div className="lp-orb-skin" />
                </div>
                <div className="lp-orb-ring absolute inset-0 [transform-style:preserve-3d]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <svg
        className="lp-ball-filters"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs dangerouslySetInnerHTML={{ __html: ORB_FILTER_DEFS }} />
      </svg>

      <div
        ref={iconBankRef}
        className="orb-icon-bank"
        aria-hidden="true"
        hidden
      >
        {Object.entries(ORB_ICON_SVGS).map(([name, svg]) => (
          <span
            key={name}
            data-orb-icon={name}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ))}
      </div>
    </div>
  );
}
