document.addEventListener("DOMContentLoaded", () => {
  // ======================
    // ======================
  //   ŞANS ÇARKI – EK İSKONTO
  // ======================
  //   ŞANS ÇARKI – EK İSKONTO (YENİ)
  // ======================
  const discountWheel = document.getElementById("discountWheel");
  const spinWheelBtn = document.getElementById("spinWheelBtn");
  const wheelResult = document.getElementById("wheelResult");

  const wheelSegments = discountWheel
    ? discountWheel.querySelectorAll(".wheel-segment")
    : [];

  // DOM sırasına göre iskonto değerleri:
  // data-discount attribute'u ile bire bir
  const wheelDiscounts = Array.from(wheelSegments).map(seg =>
    parseInt(seg.dataset.discount, 10)
  );

  let wheelRotationBase = 0;

  if (discountWheel && spinWheelBtn && wheelSegments.length === 6) {
    spinWheelBtn.addEventListener("click", () => {
      // Önce eski highlight'ları temizle
      wheelSegments.forEach(seg => seg.classList.remove("active"));

      // Rastgele bir index seç (0–5)
      const idx = Math.floor(Math.random() * wheelSegments.length);
      const selectedDiscount = wheelDiscounts[idx];
      const selectedSegment = wheelSegments[idx];

      // Görsel olarak rastgele döndür (kazanan segmenti göstermek için highlight kullanacağız)
      const extraSpins = 4 + Math.floor(Math.random() * 3); // 4–6 tur
      const randomOffset = Math.floor(Math.random() * 360);
      wheelRotationBase += extraSpins * 360 + randomOffset;

      discountWheel.classList.add("spinning");
      discountWheel.style.transform = `rotate(${wheelRotationBase}deg)`;

      // Spin bittikten sonra kazanan dilimi highlight et
      setTimeout(() => {
        discountWheel.classList.remove("spinning");

        if (selectedSegment) {
          selectedSegment.classList.add("active");
        }

        if (wheelResult) {
          wheelResult.textContent = `Kazandığınız ek iskonto: %${selectedDiscount}`;
        }
      }, 2400);
    });
  }

  //   YEŞİL ANTİREFLE
 const greenConfigs = {
    30: {
      uv: 0,
      filter: 30,
      overlayColor: "rgba(22,163,74,0.12)",
      imgFilter: "brightness(0.75) contrast(0.85) saturate(0.9) blur(1px)",
      desc: "Giriş seviye antirefle. Yansımayı kısmen kırar, görüntüde hafif koyuluk ve matlık vardır.",
      why: "Standart cama göre daha az yansıma, ancak bütçeyi korumak isteyen ve çok parlak ortamda olmayan kullanıcılar için idealdir. İlk defa antirefle deneyecek müşteriler için iyi başlangıç.",
      price: "₺600"
    },
    45: {
      uv: 0,
      filter: 45,
      overlayColor: "rgba(22,163,74,0.16)",
      imgFilter: "brightness(0.85) contrast(0.92) saturate(0.95) blur(0.7px)",
      desc: "Günlük kullanım için dengeli seviye. Refle yansımaları azalır, detaylar daha net görünür.",
      why: "Hem standart cama göre belirgin fark istiyorum, hem de en pahalı seviyeye çıkmak istemiyorum diyen kullanıcılar için. Ofis + dış mekan karma kullanıma uygun, fiyat/performans seviyesi."
     ,  price: "₺1300"
    },
    60: {
      uv: 0,
      filter: 60,
      overlayColor: "rgba(22,163,74,0.15)",
      imgFilter: "brightness(0.92) contrast(0.98) saturate(1) blur(0.5px)",
      desc: "Orta-üst segment. Netlik artar, camın varlığını daha az hissedersin.",
      why: "Ekran başında çalışan, gece araç kullanan veya ışık hassasiyeti olan kişiler için daha konforlu. Uygun bütçe ile premiuma yaklaşan seviye."
     ,  price: "₺1600"
    },
    90: {
      uv: 50,
      filter: 90,
      overlayColor: "rgba(22,163,74,0.12)",
      imgFilter: "brightness(1.02) contrast(1.03) saturate(1.02) blur(0.3px)",
      desc: "Yüksek performanslı antirefle. Net, canlı ve yansıması minimum bir görüntü.",
      why: "“Gözüm yorulmasın, netlikte taviz vermem” diyen kullanıcılar için. Standart ve düşük seviye antirefle camlara göre bariz fark hissedilir, uzun süre kullanımda konfor sağlar."
     ,  price: "₺2000"
    },
    99: {
      uv: 99,
      filter: 99,
      overlayColor: "rgba(22,163,74,0.0)",
      imgFilter: "brightness(1) contrast(1.06) saturate(1.03)",
      desc: "En üst seviye. Cam neredeyse görünmez, maksimum netlik ve koruma.",
      why: "Premium segment, en üst kaliteyi isteyen müşteriler için. Standart camlara göre yansıma neredeyse yok, fotoğrafçılar, tasarımcılar ve ekran başında uzun süre çalışanlar için en konforlu tercih."
     ,  price: "₺3000"
    }
  };

  // ======================
  //   BLUE CAM
  // ======================
  const blueConfigs = {
    30: {
      uv: 40,
      filter: 30,
      overlayColor: "rgba(252,211,77,0.16)",
      imgFilter: "brightness(0.8) contrast(0.9) saturate(0.95)",
      desc: "En ucuz blue cam. Ekranı belirgin sarı gösterir, renkler kirli görünür.",
      why: "Düşük bütçae ve sadece temel koruma isteyen kullanıcılar için. Renk doğruluğu kritik olmayan, sadece hafif mavi ışık kesilmesi istenen durumlarda tercih edilir."
        ,  price: "₺1400"
    },
    60: {
      uv: 55,
      filter: 60,
      overlayColor: "rgba(252,211,77,0.14)",
      imgFilter: "brightness(0.9) contrast(0.96) saturate(1)",
      desc: "Orta seviye. Sarılık azalmıştır, renkler daha kabul edilebilir hale gelir.",
      why: "Uygun fiyatlı ama sürekli bilgisayar/telefon kullanan biri için mantıklı tercih. Ucuz blue camların aşırı sarılığını istemeyen kullanıcıya hitap eder."
        ,  price: "₺1900"
    },
    90: {
      uv: 75,
      filter: 90,
      overlayColor: "rgba(252,211,77,0.12)",
      imgFilter: "brightness(1) contrast(1.02) saturate(1.02)",
      desc: "Üst segment. Renkler daha doğru, sarı ton hafif, koruma yüksek.",
      why: "Freelancer, ofis çalışanı, gamer gibi uzun süre ekran başında olan ve hem renkleri çok bozmadan hem de göz koruması isteyen kullanıcılar için dengeli seçim."
        ,  price: "₺2600"
    },
    99: {
      uv: 99,
      filter: 99,
      overlayColor: "rgba(252,211,77,0.0)",
      imgFilter: "brightness(1.08) contrast(1.05) saturate(1.05)",
      desc: "Premium blue cam. Hem yüksek mavi ışık koruması hem de neredeyse doğal beyaz dengesi.",
      why: "“Gece-gündüz ekran başındayım, hem gözümü korusun hem renkler bozulmasın” diyenler için. Ucuz blue camlara göre sarılık hissi minimum, premium segment ürünü."
        ,  price: "₺3400"
    }
  };

  // BLUE DOM
  const blueImage = document.getElementById("blueImage");
  const blueOverlay = document.getElementById("blueOverlay");
  const blueLabel = document.getElementById("blueLabel");
  const blueUv = document.getElementById("blueUv");
  const blueFilter = document.getElementById("blueFilter");
  const blueDesc = document.getElementById("blueDesc");
  const blueWhyText = document.getElementById("blueWhyText");
  const bluePrice = document.getElementById("bluePrice");

  // ORTAK GÜNCELLEME (YEŞİL / BLUE)
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
      if (greenWhyText) greenWhyText.textContent = cfg.why;
      if (greenPrice && cfg.price) greenPrice.textContent = cfg.price;
    } else if (type === "blue") {
      const cfg = blueConfigs[level];
      if (!cfg) return;

      blueImage.style.filter = cfg.imgFilter;
      blueOverlay.style.backgroundColor = cfg.overlayColor;
      blueLabel.textContent = `Blue Cam %${level}`;
      blueUv.textContent = `%${cfg.uv}`;
      blueFilter.textContent = `%${cfg.filter}`;
      blueDesc.textContent = cfg.desc;
      if (blueWhyText) blueWhyText.textContent = cfg.why;
      if (bluePrice && cfg.price) bluePrice.textContent = cfg.price;
    }
  }

  // LEVEL BUTONLARI
  const levelButtons = document.querySelectorAll(".level-btn");
  levelButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      const level = btn.dataset.level;

      document
        .querySelectorAll(`.level-btn[data-type="${type}"]`)
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");
      updateSection(type, level);
    });
  });

  // İlk yükleme
  updateSection("green", "30");
  updateSection("blue", "30");

  // ======================
  //   RX CAMLAR
  // ======================
  const rxConfigs = {
    nikon: {
      brandName: "Nikon RX",
      uv: 95,
      filterRate: 90,
      filteredImgFilter: "brightness(1.10) contrast(1.15) saturate(1.08)",
      overlayColor: "rgba(59,130,246,0.22)",
      desc: "Nikon RX camlar, yüksek çözünürlüklü optik yapısı ve ince film kaplaması ile net, temiz ve yansıması minimize edilmiş bir görüntü sunar.",
      why: "Hem netlik hem yansıma kontrolü isteyen, görüntü kalitesine önem veren kullanıcılar için. Özellikle detaylı iş yapanlar (optisyen, tasarımcı, mühendis vb.) için ideal seçim.",
      starsLabel: "Yüksek performans cam",
      premium: false,
      price: "₺2.600 – ₺3.100"
    },
    kodak: {
      brandName: "Kodak RX",
      uv: 90,
      filterRate: 85,
      filteredImgFilter: "brightness(1.07) contrast(1.10) saturate(1.05)",
      overlayColor: "rgba(248,113,113,0.24)",
      desc: "Kodak RX camlar, günlük kullanım konforuna odaklanır; daha yumuşak kontrast ve göz yormayan bir parlaklık sunar.",
      why: "Gün boyu takacağım, her ortamda rahatsız etmeyen, yumuşak ve konforlu bir cam olsun diyen müşteriler için. Fiyat/performans RX tercihi.",
      starsLabel: "Konfor odaklı cam",
      premium: false,
      price: "₺2.400 – ₺2.900"
    },
    zeiss: {
      brandName: "Zeiss RX",
      uv: 99,
      filterRate: 95,
      filteredImgFilter: "brightness(1.12) contrast(1.18) saturate(1.10)",
      overlayColor: "rgba(37,99,235,0.28)",
      desc: "Zeiss RX camlar, premium optik kalitesi ile maksimum detay, yüksek kontrast ve çok düşük yansıma sağlar.",
      why: "Marka, kalite ve performansta en üst segmenti isteyenler için. Fotoğraf, tasarım, detaylı okuma ve gece sürüşü yapan kullanıcılar Zeiss farkını net şekilde hisseder.",
      starsLabel: "Premium, ödüllü cam teknolojisi",
      premium: true,
      price: "₺3.400 – ₺4.000"
    }
  };

  // RX DOM
  const rxBrandCards = document.querySelectorAll(".rx-brand-card");
  const rxBrandGrid = document.getElementById("rxBrandGrid");
  const rxDetail = document.getElementById("rxDetail");
  const rxBackBtn = document.getElementById("rxBackBtn");

  const rxBaseImage = document.getElementById("rxBaseImage");
  const rxFilteredImage = document.getElementById("rxFilteredImage");
  const rxOverlay = document.getElementById("rxOverlay");
  const rxFilterLabel = document.getElementById("rxFilterLabel");
  const rxBaseLabel = document.getElementById("rxBaseLabel");
  const rxBrandName = document.getElementById("rxBrandName");
  const rxUv = document.getElementById("rxUv");
  const rxFilterRate = document.getElementById("rxFilterRate");
  const rxDesc = document.getElementById("rxDesc");
  const rxDetailTitle = document.getElementById("rxDetailTitle");
  const rxWhyText = document.getElementById("rxWhyText");
  const rxPremiumRow = document.getElementById("rxPremiumRow");
  const rxAwardsRow = document.getElementById("rxAwardsRow");
  const rxStarsRow = document.getElementById("rxStarsRow");
  const rxStarLabel = document.getElementById("rxStarLabel");
  const rxStar5 = document.getElementById("rxStar5");
  const rxBadgeUv = document.getElementById("rxBadgeUv");
  const rxBadgeFilter = document.getElementById("rxBadgeFilter");
  const rxPrice = document.getElementById("rxPrice");

  function setRxBrand(brandKey) {
    const cfg = rxConfigs[brandKey];
    if (!cfg) return;

    // Kart active
    rxBrandCards.forEach((c) => {
      c.classList.toggle("active", c.dataset.brand === brandKey);
    });

    // Başlık
    rxDetailTitle.textContent = `${cfg.brandName} Cam`;

    // Filtresiz taraf
    if (rxBaseImage) {
      rxBaseImage.style.filter = "brightness(0.82) contrast(0.82) saturate(0.9) blur(0.4px)";
    }
    if (rxBaseLabel) {
      rxBaseLabel.textContent = "Standart Cam / Filtresiz";
    }

    // Filtreli taraf
    rxFilteredImage.style.filter = cfg.filteredImgFilter;
    rxOverlay.style.backgroundColor = cfg.overlayColor;
    rxFilterLabel.textContent = `${cfg.brandName} Filtreli`;

    // Alt veriler
    rxBrandName.textContent = cfg.brandName;
    rxUv.textContent = `%${cfg.uv}`;
    rxFilterRate.textContent = `%${cfg.filterRate}`;
    rxDesc.textContent = cfg.desc;
    if (rxWhyText) rxWhyText.textContent = cfg.why;
    if (rxStarLabel) rxStarLabel.textContent = cfg.starsLabel || "";
    if (rxPrice && cfg.price) rxPrice.textContent = cfg.price;

    // Görsel üstü badge metinleri
    if (rxBadgeUv) {
      rxBadgeUv.textContent = `UV / Mavi Işık Koruma: %${cfg.uv}`;
    }
    if (rxBadgeFilter) {
      rxBadgeFilter.textContent = `Renk Doğruluğu / Kontrast: %${cfg.filterRate}`;
    }

    // Zeiss premium ise rozet/ödül satırı göster
    if (cfg.premium) {
      rxPremiumRow.classList.remove("d-none");
      rxAwardsRow.classList.remove("d-none");
      rxStarsRow.classList.remove("d-none");
      if (rxStar5) rxStar5.classList.add("premium-star");
    } else {
      rxPremiumRow.classList.add("d-none");
      rxAwardsRow.classList.add("d-none");
      rxStarsRow.classList.add("d-none");
      if (rxStar5) rxStar5.classList.remove("premium-star");
    }
  }

  function openRxDetail(brandKey) {
    setRxBrand(brandKey);
    rxBrandGrid.classList.add("d-none");
    rxDetail.classList.remove("d-none");
  }

  // RX kart tıklamaları
  rxBrandCards.forEach((card) => {
    card.addEventListener("click", () => {
      const brandKey = card.dataset.brand;
      openRxDetail(brandKey);
    });
  });

  // RX geri butonu
  if (rxBackBtn) {
    rxBackBtn.addEventListener("click", () => {
      rxDetail.classList.add("d-none");
      rxBrandGrid.classList.remove("d-none");
    });
  }

  // ======================
  //   TABS YARDIMCI
  // ======================
  function goToTab(tabKey) {
    const trigger = document.getElementById(`${tabKey}-tab`);
    if (!trigger) return;

    if (window.bootstrap && bootstrap.Tab) {
      const tab = new bootstrap.Tab(trigger);
      tab.show();
    } else {
      trigger.click();
    }
  }

  // ======================
  //   GİRİŞ EKRANI YÖNLENDİRME
  // ======================
  const introScreen = document.getElementById("introScreen");
  const mainApp = document.getElementById("mainApp");
  const introSkipBtn = document.getElementById("introSkipBtn");
  const introOptions = document.querySelectorAll(".intro-option");

  function showMainApp() {
    if (introScreen) introScreen.classList.add("d-none");
    if (mainApp) mainApp.classList.remove("d-none");
  }

  introOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      const useCase = opt.dataset.useCase; // daily / tech / driver
      showMainApp();

      if (useCase === "daily") {
        // Günlük kullanım: Yeşil antirefle orta seviye
        goToTab("green");
        const btn = document.querySelector('.level-btn[data-type="green"][data-level="45"]');
        if (btn) btn.click();
      } else if (useCase === "tech") {
        // Bilgisayar / telefon: Blue cam yüksek seviye
        goToTab("blue");
        const btn = document.querySelector('.level-btn[data-type="blue"][data-level="90"]');
        if (btn) btn.click();
      } else if (useCase === "driver") {
        // Işık hassasiyeti / yol: RX Zeiss premium
        goToTab("rx");
        openRxDetail("zeiss");
      }
    });
  });

  if (introSkipBtn) {
    introSkipBtn.addEventListener("click", () => {
      showMainApp();
    });
  }

  // ======================
  //   TAM EKRAN
  // ======================
  const fullscreenBtn = document.getElementById("fullscreenBtn");

  if (fullscreenBtn && mainApp) {
    fullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        mainApp.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
  }
});
