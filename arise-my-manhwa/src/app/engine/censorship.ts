import { computeSecretFingerprint } from "@/lib/computeSecretFingerprint";

const chickens = [
  "fcb4dacbd99b21368c50f29c1d47071c87cf2225ab9192282c785460391cd365",
  "68840b60ac27eacaa7afe17e898d3c4a2dc71acff8c74d6782c1bcaafd14963d",
  "67f745224fd6e1a7a3a244514d5807fcc994cbb62ca4ec8fa44cd14244a515ae",
  "681fea565117808c6dbe002520d2cfeeb3e5c67e68630afb4a453449a9da587b",
  "2f3d913b3db9e15a930aac43eb2d6fe8817db8e4bcf37794bf0227b06b718d1b",
  "922a700b807e4994df82eba2b48a6ac131fe8d8d1035d06b3592d622fb232161",
  "cb69ee6774eafcc720adb1f689d28acbb9f47998cbea0299ec66a58dedf91c37",
];

const ducks = [
  "1c52cb20c0cbc76349fa63232b982bd394cf0850ebc17240dcf33c19fb15a26d",
  "e1d4de9b8d464d7da07c276b63a42c1c9922224f0a6cab6b0826427ce4a7461a",
  "0be3174bfb1a48a65875c2f035b1ae14fbc8f232f55785018de0cfe2132fa952",
  "0f174769641b2e5d2c79b5a83e8ef91e004f6f3e62531cd70cfdff02159268cb",
  "e9fb8ae8ff720acd91025229478a21e43e8e976e30119a76c293201adf572736",
  "f65a0dc0e07b5d084ff24c69dcdb953f7b57101d2ebb716d4dfb5963076ef807",
  "2bf38af1646489c2c086f811d082054cd29e23fa7bb5c525396bec01b3ab688e",
];

const cats = [
  "fcffc3e997d952007d1b902a9cf40b750ba4a410ac65bfd95475996bf51359e4",
  "3172a5fa159754d703489dfba5af520b8ace107cdf170f4c4cb38a6797aa163f",
  "500012dbff4498a9c4513369d6b9b373fab9330ffd2cb1e622294043cc21b610",
  "84e3a8d34ee7d0c8e7a2926dd1acad46a0b66b9d27725b3a7e5053550f490301",
];

const roasted = [
  "a2bfbce0046c9a52a0eabf98f73e0f8e09959970431fc892ebdb4e1c97031b50",
  "6eca1adf06851f99e9cdfbb496c27d46ff81106903d11f3346a146e96082b016",
  "49a124c9ed6fbbad4105b3657dc25de369bcafb9d6787f610c08f584cd607d0f",
  "c3afb59420c812cbc7c8f57ad3e8d79407f10106a99f829aa65316c99d0b29c4",
  "2b808858836a5c205080f5b93201ef92e098cff931d8de6d9f20dc722997d077",
  "07bef89d1a7d63c9c5ed64ba0f73d6cff689811847c2e20c8b3fbfb060e1d64e",
  "baeb994922d5473f534aa54322d83effe74c6c4dac807e6b523a677d7acdc17b",
  "ea4735a879edd5cc94ca7db26edd5a970df69a41f0009d3444486647e44175af",
  "f2412249030454cd13ac6f7965871d924c16daacda0123de81892adb19ce49ac",
  "9958c56e12bab8549cf752bcd8bec4ac36cf79c404b1faf5611f057bb71bc0e1",
  "76cdade0b3d4caf0888f60318a5cbca00f830a3b0bf37735fc64fdaeb67c34d3",
  "1bf53c97869e1ea89bda19da64a9173d48fe4ec823e949e2c898f8abb3fbf457",
  "1bf53c97869e1ea89bda19da64a9173d48fe4ec823e949e2c898f8abb3fbf457",
  "3d7f973fab8f4a19c0a3e59efe970ed7bd55a1cb795752d9cbe3c19e8a7d81ec",
];

const banned = [
  "8a05d4869d9d6ce388c6cd2db13ca12b88097b90f9be027d5ffaaa467c7a6e5e",
  "0c475212a608138244c5fc150b1563e5ef79c516234fd78dcd5993f726c359a0",
  "df17388805f99f2ff3e5ae97a0f55e5c927eb47f17ca65822bf8c88f02bac3dd",
  "86c3355d1bd581cdf7306729d8dd0ee9b7a317b9cfd6d7a6f5fad9c0dafe2167",
  "23a2484cd420c9ffbfcc2c0075a9b330664450ced1fc64ab6a65e278086b8c6e",
  "fb4cabe709b62eea1b4cc0030c76f5e4a43ee677ce19124e8e7bafa86c78ab66",
  "d99c26daee85f7dc81c46c061a5874cff7179ed72d884d2316d664d36ffe7ab5",
  "b93c38af5aa221d76c60ee3eb762efee0cdb0daf29ceb235b7dda6d46c06490d",
  "8cf6c8765dc757319461dd9a785e77c201b8e5a604d36b817cd987c6a5e62500",
  "f4a1cb290745717f86c3cee30fc324c0d80a9945fcbc7bbeb010579f58792f1e",
  "7c87c47c42fc983119551342be9ddd5b32e530c0504ccdbbaa1e12b1d9f1bbcb",
  "d04fad4f21d030da7a1301afbf480ef6246eb7bbf0f26e31865b2e015a25f747",
  "d685ff22fb9da01ee949db212770729603989850864ef7a7085e1f086cfa7deb",
  "533b90588d9ccf7967da54691f575e9fd4926c6e0b5fd94a47b932bcea270bee",
  "9c2d61f28f5bb7f3f1dc9122be64cda8a428b46ce68b70120da4c41dba96ba4c",
  "5d4b1a3eebe64dfa631d0e3b084bd96ee9364c3669269f838ca17a4900276264",
  "d56f56413b9679fc0820a2c0237224ded8554c61fab8959c174123c8b68ba029",
  "323a9ab60739726070d615ff3a05d7ff6bb6e3c4dd9ff16ce24f253ecd7b8851",
  "975c6739de7d4999db15972f707f5f4e95649275f1c0c48e895b8c537e8638ec",
  "67ee26eb9e1c1c7124797321b02bca90a19c18171782917cd4a487b722484dce",
  "6df5aa7b72a4e6e3fb726489ff1437daa5752047507f4da912680b1d6647c7d6",
  "b0864805364359e8c5810c233b1bf2c74dedce9055ae5f7680ba05b4e39db8e2",
  "a8f841472ecffdd6266151148320c8e36847a24ead9d3338e0313b075c16649d",
  "f9b127cd90e85b0ff68dd220361671663f0154b2b827f1f7ea797b020ca0018c",
  "d5c20e9a1ecf01c82da24c514d867498b3e5f522adc1523ce29404a6563641d5",
  "241022b49d7c0aba24a61eea1137a804f36e4bcb47af42950275baac9b4e7aac",
  "fc99a70e17b6c86ef1b537654b0f50353567a7b59912c3ba955f3fca4d1ea696",
  "255306e968009003d295cb2a7256f27bfcdb5d1743bf4d9f2aa4b8adf1a7734d",
  "048c7b709763dd9c43794d241c369f0abcb079d546ddcbbba9968a1ed1da7ed7",
  "520cbfeef3e4c405d79478eedccb97a4d476be585626dd2b1c53292797491bc7",
  "f9f28a7ae7e8b1719b350a04dc087a4b8e33478d109ceeef6ba892b32d1105c9",
  "d177f1bfe603647ef4c1c0e6f1a7172081fb9bbc2ea859705949f2c5aa5d4f22",
  "302feef2c09247fbd23789581f7f5e2219f88ae0a937880954938573c2a52a84",
  "99edd6f57b864873835f16f19c805dd94bed9da8967b84e3a62782f106d9ebcc",
  "e75e5f01dcd8351c9553e89558085bd68e6feb295dee5d8da0c9b43ee303ce36",
  "135e52a026aea9d2e12de358a85e05cf21121a18269269b7c62678c3bc846f5b",
  "28e5b2d3eb5f1ef4cc7b570878b03acf303a6ca4ca95893591e0fb943b0beab0",
  "a26b26340f8d0363633490556d20bcc250726d10e1431eb8c22d6b1ff3f2b14a",
  "27e4ddde96ec6a1dbe1cf12d79448b3e72f144944c15b299629542d1b65fbabf",
  "efd9c0a391ee93251046a58326d1b21b33fe21d71a3fb1855b9048ade53df77c",
  "6d505fcce416c26a606878aab4d249a034ba2a9846cb1f883e0f9e3fb76ba6da",
  "3a37b8a1b72f9bca51233536d50f9c8d33a787434684787871e0049c82347cda",
  "16f9b451184a7c3148344c7d0315f5312ca20553d2271912ecaad91810d977e6",
  "7406537eb74d1885bd05e191228de313b13702a64d90ae1736c6377b25ab579a",
  "7e4d1395ae18980015cab16c85ffa20b4cb90a2db594126e893d0f7ac6eecaa8",
  "ba813ee6c25698f0f68a07121d38bb47c9aa404c1ab0a6e767595cb75e1747b8",
  "6586c93f3ece83e01ecc1eb84a7711e7975826a388d478a009468ea0ed9dc03e",
  "8960174c74d86e03ae88fb6774580170e49952f2286d960be08c556bbd0dda95",
  "4d611454369aa1a4e2b7eed1734fac5d480f08fb86b87a162967e416370f2a8e",
  "59d48440f85eabf565fe8d3bc6b973ba64c70df3b36b0511e0e67ceca91762b3",
  "cd926926e2af74e43d1a6a420a7e1933b78662320477a3c018b2711d8765e339",
  "80e90057df6a59823f51aafac36ed5bc4e5ac26d675d9c1467501590c82f12d4",
  "a9cf28b869b70e258adde5639a048f866ec86f8f3f3d53bfc960b86aa6da9239",
  "cc2adbf8ac0cddeefa304d7b20f14a7e047a4b2299cc5e8f898f5c59660bd964",
  "92a150a46146e9d3f84899cf15e12514af684e7ee18d7add782ddd4f4a15ef18",
  "d9b2e84ef6dc0ce449357d52c9095f69b173a1b848ea2921199d33b0ec10024a",
  "a9329a7e4d367a0135c1ca86c6ce5ecabcc26529235229d71b6bf991f7689e21",
  "8f160c6fd8ccc3fb2a371a4b52748f0bd030766627c4322e2911fe82f6b10497",
  "620e96eae4f3e88cbe0770292b33724c5df3866d83f39df6380441f7271c80e2",
  "cafa3481fa3c45ed1e55cd0129c12b477eeab5aa3d6da20cae6d6292f19b0e6d",
  "be07994e9a83aa3689e79b6e96123676ccc4fa29f523c28c750c6d60505531ee",
  "f6498069768cd3aa79b2b0c91879694f05a259c8ee4a6bb343f0435f74eb1b53",
  "c9b6b26cb3a694eb78fcac0a14ad18d46d50907186a9add41022d31d191b2b65",
];

const young = [
  "ffdf66787b4a33b78b18c18822e334cfe2c8406caf442851deef451bd43140a1",
  "858f22219afc4b32a7ba9a27a213d7f495e77c3cceed8147eae5282bf3e23d39",
  "8c3c46df84ace3d58d4ce0fbc513017986b33c6002ae369d9f7dd1f892a898cb",
  "66caa22b9483fdf026ce67de61067d81535a7c9b3169cbc5c2a455ac8dcc7bec",
  "76893047b1eff9fadc7be07b13adb5aaed9c73bcdeea46ee07098605e2c7ff76",
  "526cb848754e2baaa17376a5693d90ba3f69f71fd2a866f22876ac8a075849a7",
  "f59c38e31d0f64dc1bfcdf34451723bc1a65570e209e5496c8d1d7f6d3d649db",
  "e013a67e275c62c1402ccbbb11ad14afb8b8a82318a44c07d67599ed5ac874de",
  "3bef34219fb07f867ecbff4d6748f598d6cc0761e17dd0d431ee1f4ec3281374",
  "8211bf5f613fac06cd5d074d34c16dfacc9367c8afaa6ad3aff99d145e5221be",
];

const getFingerprint = (word: string) => {
  return computeSecretFingerprint(
    word.toLocaleLowerCase().replaceAll(/[^a-zA-Z0-9]/gi, "")
  );
};

const encode = (list: string[]) => {
  console.log(
    JSON.stringify(
      list
        .sort((a, b) => b.length - a.length)
        .map((item) => getFingerprint(item)),
      null,
      2
    )
  );
};

// encode([ "badword" ])

export const filterOutBadWords = (sentence: string) => {
  if (process.env.ENABLE_CENSORSHIP !== "true") {
    return sentence;
  }

  let requireCensorship = false;

  const words = sentence
    .replaceAll(/[^a-zA-Z0-9]/gi, " ")
    .replaceAll(/\s+/giis, " ")
    .trim()
    .split(" ");

  const sanitized = words
    .map((word) => {
      const fingerprint = getFingerprint(word);

      let result: string = word;
      // some users want to play it smart and bypass our system so let's play too
      if (chickens.includes(fingerprint)) {
        result = "Explicit word/prompt detected, replaced with chicken instead";
      } else if (ducks.includes(fingerprint)) {
        result = "Explicit word/prompt detected, replaced with duck instead";
      } else if (cats.includes(fingerprint)) {
        result = "Explicit word/prompt detected, replaced with cats instead";
      } else if (roasted.includes(fingerprint)) {
        result = "Explicit word/prompt detected, replaced with dawg instead";
      } else if (young.includes(fingerprint)) {
        result = "Stop being a pervert";
      } else if (banned.includes(fingerprint)) {
        result = "_BANNED_";
      }

      if (result !== word) {
        requireCensorship = true;
      }
      return result;
    })
    .filter((item) => item !== "_BANNED_")
    .join(" ");

  // if the user didn't try to use a bad word, we leave it untouched
  // he words array has been degraded by the replace operation, but it removes commas etc which isn't great
  // so if the request was genuine and SFW, it's best to return the original prompt
  return requireCensorship ? sanitized : sentence;
};
