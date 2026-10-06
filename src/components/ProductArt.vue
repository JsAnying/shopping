<script setup>
import { useId } from "vue";
defineProps({
  kind: { type: String, default: "camera" },
  color: { type: String, default: "#eee7dd" },
  accent: { type: String, default: "#a9afb3" },
});
const id = useId().replace(/:/g, "");
</script>
<template>
  <svg class="product-art" viewBox="0 0 300 300" fill="none" aria-hidden="true">
    <defs>
      <linearGradient
        :id="`${id}-bg`"
        x1="0"
        y1="0"
        x2="300"
        y2="300"
        gradientUnits="userSpaceOnUse"
      >
        <stop :stop-color="color" />
        <stop offset="1" :stop-color="color" stop-opacity=".6" />
      </linearGradient>
      <linearGradient :id="`${id}-shine`" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="white" stop-opacity=".6" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <filter :id="`${id}-shadow`" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow
          dx="0"
          dy="12"
          stdDeviation="8"
          flood-color="#3d342c"
          flood-opacity=".2"
        />
      </filter>
    </defs>
    <path fill="white" d="M0 0h300v300H0z" />
    <path :fill="`url(#${id}-bg)`" d="M0 0h300v300H0z" />
    <circle cx="243" cy="48" r="116" fill="white" opacity=".16" />
    <ellipse cx="152" cy="246" rx="83" ry="12" fill="#50483e" opacity=".07" />
    <g :filter="`url(#${id}-shadow)`">
      <g v-if="kind === 'camera'" transform="rotate(-9 150 150)">
        <rect x="48" y="100" width="204" height="124" rx="15" :fill="accent" />
        <rect x="48" y="124" width="204" height="76" rx="4" fill="#343737" />
        <path d="M110 100 122 82h58l14 18" :fill="accent" />
        <rect x="67" y="91" width="28" height="9" rx="3" fill="#42494a" />
        <rect x="65" y="108" width="28" height="12" rx="3" fill="#282d2e" />
        <rect x="212" y="109" width="22" height="12" rx="2" fill="#e7e8e1" />
        <circle cx="156" cy="163" r="56" fill="#656968" />
        <circle
          cx="156"
          cy="163"
          r="47"
          fill="#222829"
          stroke="#8b9090"
          stroke-width="3"
        />
        <circle
          cx="156"
          cy="163"
          r="34"
          fill="#111f27"
          stroke="#454d4f"
          stroke-width="5"
        />
        <circle cx="156" cy="163" r="23" fill="#204252" />
        <ellipse cx="145" cy="149" rx="12" ry="7" fill="#aacbd2" opacity=".5" />
        <path
          d="M185 119h20"
          stroke="white"
          stroke-opacity=".5"
          stroke-width="3"
        />
      </g>
      <g v-else-if="kind === 'headphones'" transform="rotate(12 150 155)">
        <path
          d="M70 165v-30a80 80 0 0 1 160 0v30"
          :stroke="accent"
          stroke-width="24"
        />
        <path
          d="M73 137a77 77 0 0 1 154 0"
          stroke="#faf8f2"
          stroke-opacity=".6"
          stroke-width="7"
        />
        <rect x="54" y="142" width="52" height="91" rx="23" :fill="accent" />
        <rect x="198" y="142" width="52" height="91" rx="23" :fill="accent" />
        <rect x="82" y="151" width="24" height="74" rx="12" fill="#817e78" />
        <rect x="197" y="151" width="24" height="74" rx="12" fill="#817e78" />
      </g>
      <g v-else-if="kind === 'shoe'" transform="rotate(-13 150 170)">
        <path
          d="M41 191c16-8 40-16 62-42l24-43 28 16 11 34c28 5 42-6 64-3l16 47-9 23H43z"
          :fill="accent"
          stroke="#b7b8af"
          stroke-width="2"
        />
        <path d="m42 206 201-3-6 22H43z" fill="#f6f4eb" />
        <path d="m66 222 163-1" stroke="#a5a9a5" stroke-width="3" />
        <path
          d="m131 160 19 35 29-29-7 36"
          stroke="#929b97"
          stroke-width="12"
        />
        <path
          d="m99 155 51-5m-60 17 55-5m-62 18 61-6"
          stroke="#eceae2"
          stroke-width="5"
        />
        <path d="m53 191 36-10m80-32 44 5" stroke="#9fa9a4" stroke-width="7" />
      </g>
      <g v-else-if="kind === 'bag'" transform="rotate(-8 150 160)">
        <path
          d="M105 124V90a45 45 0 0 1 90 0v34"
          :stroke="accent"
          stroke-width="13"
        />
        <path d="m77 111-13 121q87 24 172 0l-14-121z" :fill="accent" />
        <path
          d="m83 122-9 99q76 19 152 0l-10-99"
          stroke="#f3d1a1"
          stroke-opacity=".3"
          stroke-width="2"
        />
        <path
          d="M104 122v105m91-105v105"
          stroke="#4d3121"
          stroke-opacity=".3"
          stroke-width="4"
        />
        <rect x="132" y="156" width="38" height="22" rx="3" fill="#dab57b" />
        <path d="M142 166h18" stroke="#795536" stroke-width="2" />
      </g>
      <g v-else-if="kind === 'lamp'">
        <ellipse cx="150" cy="239" rx="54" ry="13" :fill="accent" />
        <path d="M130 135h40l9 101h-58z" :fill="accent" />
        <path
          d="M51 146a99 99 0 0 1 198 0c-50 14-148 14-198 0"
          :fill="accent"
        />
        <ellipse
          cx="150"
          cy="147"
          rx="99"
          ry="11"
          fill="#ac8660"
          opacity=".4"
        />
        <path
          d="M74 119c10-27 30-46 55-51"
          stroke="white"
          stroke-opacity=".4"
          stroke-width="8"
          stroke-linecap="round"
        />
      </g>
      <g v-else-if="kind === 'toy'">
        <ellipse cx="122" cy="65" rx="23" ry="43" :fill="accent" />
        <ellipse cx="183" cy="65" rx="23" ry="43" :fill="accent" />
        <ellipse cx="122" cy="65" rx="10" ry="27" fill="#e7d8cf" />
        <ellipse cx="183" cy="65" rx="10" ry="27" fill="#e7d8cf" />
        <ellipse cx="151" cy="190" rx="58" ry="61" :fill="accent" />
        <ellipse
          cx="90"
          cy="184"
          rx="20"
          ry="32"
          :fill="accent"
          transform="rotate(25 90 184)"
        />
        <ellipse
          cx="214"
          cy="184"
          rx="20"
          ry="32"
          :fill="accent"
          transform="rotate(-25 214 184)"
        />
        <ellipse cx="122" cy="244" rx="25" ry="16" :fill="accent" />
        <ellipse cx="180" cy="244" rx="25" ry="16" :fill="accent" />
        <ellipse cx="152" cy="118" rx="68" ry="57" :fill="accent" />
        <ellipse cx="152" cy="128" rx="50" ry="39" fill="#f7e8d4" />
        <ellipse cx="133" cy="119" rx="7" ry="10" fill="#32302f" />
        <ellipse cx="172" cy="119" rx="7" ry="10" fill="#32302f" />
        <circle cx="131" cy="115" r="2" fill="white" />
        <circle cx="170" cy="115" r="2" fill="white" />
        <path
          d="m143 139 9 8 9-8"
          stroke="#6e5046"
          stroke-width="3"
          stroke-linecap="round"
        />
        <ellipse cx="120" cy="136" rx="9" ry="5" fill="#edb3a4" />
        <ellipse cx="185" cy="136" rx="9" ry="5" fill="#edb3a4" />
      </g>
      <g v-else-if="kind === 'phone'" transform="rotate(13 150 150)">
        <rect
          x="88"
          y="35"
          width="125"
          height="230"
          rx="23"
          :fill="accent"
          stroke="#b7ccd1"
          stroke-width="3"
        />
        <rect x="97" y="45" width="58" height="64" rx="16" fill="#c1d2d9" />
        <circle
          cx="113"
          cy="63"
          r="13"
          fill="#29343d"
          stroke="#809fac"
          stroke-width="3"
        />
        <circle
          cx="138"
          cy="89"
          r="13"
          fill="#29343d"
          stroke="#809fac"
          stroke-width="3"
        />
        <circle cx="139" cy="61" r="5" fill="#f1efdc" />
        <circle cx="149" cy="157" r="12" fill="#d9e5e8" />
        <path d="m152 140 6-5" stroke="#d9e5e8" stroke-width="4" />
        <path
          d="M93 221V64"
          stroke="white"
          stroke-opacity=".6"
          stroke-width="3"
        />
      </g>
      <g v-else-if="kind === 'guitar'" transform="rotate(24 150 150)">
        <path
          d="M138 110c-23-13-41 4-35 26 6 25-35 22-35 67 0 60 106 60 106 0 0-45-41-42-35-67"
          :fill="accent"
          stroke="#996836"
          stroke-width="3"
        />
        <rect x="126" y="43" width="16" height="112" rx="3" fill="#73523c" />
        <rect x="121" y="20" width="27" height="36" rx="6" fill="#af7d40" />
        <circle
          cx="122"
          cy="182"
          r="22"
          fill="#533a2b"
          stroke="#edcc8b"
          stroke-width="4"
        />
        <rect x="101" y="218" width="44" height="9" rx="3" fill="#684a36" />
        <path
          d="M130 39v185m4-185v185m4-185v185"
          stroke="#ece2c1"
          stroke-width="1"
        />
      </g>
      <g v-else-if="kind === 'books'" transform="rotate(-12 150 160)">
        <rect x="65" y="81" width="141" height="163" rx="4" fill="#b77d5b" />
        <rect x="82" y="67" width="141" height="163" rx="4" fill="#ece6d7" />
        <rect x="95" y="53" width="141" height="163" rx="4" :fill="accent" />
        <path
          d="M106 53v163"
          stroke="#344c47"
          stroke-opacity=".5"
          stroke-width="3"
        />
        <path d="M127 102h78m-78 12h60" stroke="#e9e1ce" stroke-width="4" />
        <circle cx="165" cy="158" r="27" fill="#e3bd7f" />
        <path d="m141 163 24-25 24 25" stroke="#617d69" stroke-width="4" />
      </g>
      <g v-else-if="kind === 'console'" transform="rotate(-12 150 150)">
        <rect x="38" y="93" width="224" height="124" rx="28" :fill="accent" />
        <rect x="72" y="93" width="156" height="124" fill="#333e43" />
        <rect x="82" y="103" width="136" height="103" rx="3" fill="#90b6b3" />
        <path d="m82 175 41-35 36 22 24-43 35 48v39H82z" fill="#5c8d79" />
        <circle cx="55" cy="126" r="10" fill="#3b4245" />
        <circle cx="245" cy="177" r="10" fill="#3b4245" />
        <path d="M50 171h12m-6-6v12" stroke="#3b4245" stroke-width="4" />
        <circle cx="245" cy="127" r="3" fill="#3b4245" />
        <circle cx="237" cy="135" r="3" fill="#3b4245" />
        <circle cx="253" cy="135" r="3" fill="#3b4245" />
        <circle cx="245" cy="143" r="3" fill="#3b4245" />
      </g>
      <g v-else-if="kind === 'perfume'">
        <rect x="105" y="43" width="90" height="50" rx="5" fill="#333638" />
        <path d="M115 90h70v24h-70z" fill="#b1a076" />
        <rect
          x="82"
          y="111"
          width="136"
          height="135"
          rx="7"
          fill="#f8f4df"
          fill-opacity=".8"
          stroke="#e5d7b7"
          stroke-width="3"
        />
        <path d="M91 166h118v69H91z" :fill="accent" fill-opacity=".65" />
        <rect x="96" y="136" width="107" height="62" fill="#faf8ee" />
        <path
          d="M114 155h70m-60 13h48m-45 10h42"
          stroke="#615e54"
          stroke-width="3"
        />
        <path d="M91 120v107" stroke="white" stroke-width="4" />
      </g>
      <g v-else-if="kind === 'plant'">
        <path
          d="M151 193V82m0 69-42-35m43 9 41-44m-40 86 51-27"
          stroke="#59795a"
          stroke-width="5"
        />
        <ellipse
          cx="119"
          cy="112"
          rx="20"
          ry="41"
          :fill="accent"
          transform="rotate(-43 119 112)"
        />
        <ellipse
          cx="180"
          cy="93"
          rx="20"
          ry="43"
          :fill="accent"
          transform="rotate(44 180 93)"
        />
        <ellipse
          cx="187"
          cy="145"
          rx="16"
          ry="34"
          fill="#87a47b"
          transform="rotate(62 187 145)"
        />
        <ellipse cx="147" cy="72" rx="17" ry="34" fill="#87a47b" />
        <path d="m107 180 13 68h64l13-68z" fill="#d4baa0" />
        <ellipse cx="152" cy="182" rx="45" ry="10" fill="#a38b72" />
        <path d="m120 193 8 43" stroke="#eee2d0" stroke-width="4" />
      </g>
    </g>
  </svg>
</template>
<style scoped>
.product-art {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
