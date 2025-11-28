document.addEventListener("DOMContentLoaded", () => {
  // YEŞİL ANTİREFLE KONFİGLERİ
  const greenConfigs = {
    30: {
      uv: 60,
      filter: 30,
      overlayColor: "rgba(22,163,74,0.08)",
      imgFilter: "brightness(0.80) contrast(0.90) saturate(0.9) blur(0.7px)",
      desc: "Giriş seviye antirefle. Yansımayı kısmen kırar, görüntüde hafif koyuluk ve matlık vardır."
    },
    45: {
      uv: 70,
      filter: 45,
      overlayColor: "rgba(22,163,74,0.14)",
      imgFilter: "brightness(0.85) contrast(0.92) saturate(0.95) blur(0.7px)",
      desc: "Günlük kullanım için dengeli seviye. Refle yansımaları azalır, detaylar daha net görünür."
    },
    60: {
      uv: 80,
      filter: 60,
      overlayColor: "rgba(22,163,74,0.10)",
      imgFilter: "brightness(0.92) contrast(0.98) saturate(1) blur(0.5px)",
      desc: "Orta-üst segment. Netlik artar, camın varlığını daha az hissedersin."
    },
    90: {
      uv: 95,
      filter: 90,
      overlayColor: "rgba(22,163,74,0.09)",
      imgFilter: "brightness(1.02) contrast(1.03) saturate(1.02) blur(0.2px)",
      desc: "Yüksek performanslı antirefle. Net, canlı ve yansıması minimum bir görüntü."
    },
    99: {
      uv: 99,
      filter: 99,
      overlayColor: "rgba(22,163,74,0.05)",
      imgFilter: "brightness(1.05) contrast(1.06) saturate(1.03)",
      desc: "En üst seviye. Cam neredeyse görünmez, maksimum netlik ve koruma."
    }
  };

  // BLUE CAM KONFİGLERİ
  // Not: Düşük seviyede sarı ton fazla, seviye yükseldikçe sarılık azalıyor.
  const blueConfigs = {
    30: {
      uv: 40,
      filter: 30, // mavi ışık blok oranı
      overlayColor: "rgba(252,211,77,0.39)", // sarımsı
      imgFilter: "brightness(0.9) contrast(0.9) saturate(0.95)",
      desc: "En ucuz blue cam. Ekranı belirgin sarı gösterir, renkler kirli görünür."
    },
    60: {
      uv: 65,
      filter: 60,
      overlayColor: "rgba(252,211,77,0.14)",
      imgFilter: "brightness(0.98) contrast(0.96) saturate(1)",
      desc: "Orta seviye. Sarılık azalmıştır, renkler daha kabul edilebilir hale gelir."
    },
    90: {
      uv: 85,
      filter: 90,
      overlayColor: "rgba(252,211,77,0.10)",
      imgFilter: "brightness(1.02) contrast(1.02) saturate(1.02)",
      desc: "Üst segment. Renkler daha doğru, sarı ton hafif, koruma yüksek."
    },
    99: {
      uv: 95,
      filter: 99,
      overlayColor: "rgba(252,211,77,0.08)",
      imgFilter: "brightness(1.05) contrast(1.05) saturate(1.05)",
      desc: "Premium blue cam. Hem yüksek mavi ışık koruması hem de neredeyse doğal beyaz dengesi."
    }
  };

  // DOM referansları - Yeşil
  const greenImage = document.getElementById("greenImage");
  const greenOverlay = document.getElementById("greenOverlay");
  const greenLabel = document.getElementById("greenLabel");
  const greenUv = document.getElementById("greenUv");
  const greenFilter = document.getElementById("greenFilter");
  const greenDesc = document.getElementById("greenDesc");

  // DOM referansları - Blue
  const blueImage = document.getElementById("blueImage");
  const blueOverlay = document.getElementById("blueOverlay");
  const blueLabel = document.getElementById("blueLabel");
  const blueUv = document.getElementById("blueUv");
  const blueFilter = document.getElementById("blueFilter");
  const blueDesc = document.getElementById("blueDesc");

  // Ortak güncelleme fonksiyonu
  function updateSection(type, level) {
    if (type === "green") {
      const cfg = greenConfigs[level];
      if (!cfg) return;

      greenImage.style.filter = cfg.imgFilter;
      greenOverlay.style.backgroundColor = cfg.overlayColor;
      greenLabel.textContent = `Yeşil Antirefle %${level}`;
      greenUv.textContent = `%${cfg.uv}`;
      greenFilter.textContent = `%${cfg.filter}`;
      greenDesc.textContent = cfg.desc;
    } else if (type === "blue") {
      const cfg = blueConfigs[level];
      if (!cfg) return;

      blueImage.style.filter = cfg.imgFilter;
      blueOverlay.style.backgroundColor = cfg.overlayColor;
      blueLabel.textContent = `Blue Cam %${level}`;
      blueUv.textContent = `%${cfg.uv}`;
      blueFilter.textContent = `%${cfg.filter}`;
      blueDesc.textContent = cfg.desc;
    }
  }

  // Buton click eventleri
  const levelButtons = document.querySelectorAll(".level-btn");
  levelButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      const level = btn.dataset.level;

      // Aynı tipteki butonların active sınıfını temizle
      document
        .querySelectorAll(`.level-btn[data-type="${type}"]`)
        .forEach((b) => b.classList.remove("active"));

      // Tıklanmış butonu active yap
      btn.classList.add("active");

      // İlgili bölümü güncelle
      updateSection(type, level);
    });
  });

  // Başlangıç değerleri
  updateSection("green", "30");
  updateSection("blue", "30");
  // ==========================
//   T A M   E K R A N   B U T O N U
// ==========================
const fullscreenBtn = document.getElementById("fullscreenBtn");

// Tüm uygulama alanını seçiyoruz
const appWrapper = document.querySelector(".app-wrapper");

if (fullscreenBtn) {
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      // Uygulama komple tam ekran olsun
      appWrapper.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
}

});
