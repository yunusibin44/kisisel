document.addEventListener("DOMContentLoaded", () => {
  // ======================
  //   ŞANS ÇARKI – EK İSKONTO (YENİ)
  // ======================
  const discountWheel = document.getElementById("discountWheel");
  const spinWheelBtn = document.getElementById("spinWheelBtn");
  const wheelResult = document.getElementById("wheelResult");

  const wheelSegments = discountWheel
    ? discountWheel.querySelectorAll(".wheel-segment")
    : [];

  const wheelDiscounts = Array.from(wheelSegments).map((seg) =>
    parseInt(seg.dataset.discount, 10)
  );

  let wheelRotationBase = 0;

  if (discountWheel && spinWheelBtn && wheelSegments.length === 6) {
    spinWheelBtn.addEventListener("click", () => {
      // Eski highlight'ları temizle
      wheelSegments.forEach((seg) => seg.classList.remove("active"));

      // Rastgele bir index seç (0–5)
      const idx = Math.floor(Math.random() * wheelSegments.length);
      const selectedDiscount = wheelDiscounts[idx];
      const selectedSegment = wheelSegments[idx];

      // Görsel spin
      const extraSpins = 4 + Math.floor(Math.random() * 3); // 4–6 tur
      const randomOffset = Math.floor(Math.random() * 360);
      wheelRotationBase += extraSpins * 360 + randomOffset;

      discountWheel.classList.add("spinning");
      discountWheel.style.transform = `rotate(${wheelRotationBase}deg)`;

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

  // ======================
  //   YEŞİL ANTİREFLE
  // ======================
  const greenConfigs = {
    30: {
      uv: 0,
      filter: 30,
      overlayColor: "rgba(22,163,74,0.10)",
      imgFilter: "brightness(0.75) contrast(0.85) saturate(0.9) blur(1px)",
      desc: "Giriş seviye antirefle. Yansımayı kısmen kırar, görüntüde hafif koyuluk ve matlık vardır.",
      why: "Standart cama göre daha az yansıma, ancak bütçeyi korumak isteyen ve çok parlak ortamda olmayan kullanıcılar için idealdir. İlk defa antirefle deneyecek müşteriler için iyi başlangıç.",
      price: "₺600"
    },
    45: {
      uv: 0,
      filter: 45,
      overlayColor: "rgba(22,163,74,0.12)",
      imgFilter: "brightness(0.85) contrast(0.92) saturate(0.95) blur(0.7px)",
      desc: "Günlük kullanım için dengeli seviye. Refle yansımaları azalır, detaylar daha net görünür.",
      why: "Hem standart cama göre belirgin fark istiyorum, hem de en pahalı seviyeye çıkmak istemiyorum diyen kullanıcılar için. Ofis + dış mekan karma kullanıma uygun, fiyat/performans seviyesi.",
      price: "₺1300"
    },
    60: {
      uv: 0,
      filter: 60,
      overlayColor: "rgba(22,163,74,0.15)",
      imgFilter: "brightness(0.92) contrast(0.98) saturate(1) blur(0.5px)",
      desc: "Orta-üst segment. Netlik artar, camın varlığını daha az hissedersin.",
      why: "Ekran başında çalışan, gece araç kullanan veya ışık hassasiyeti olan kişiler için daha konforlu. Uygun bütçe ile premiuma yaklaşan seviye.",
      price: "₺1600"
    },
    90: {
      uv: 50,
      filter: 90,
      overlayColor: "rgba(22,163,74,0.12)",
      imgFilter: "brightness(1.02) contrast(1.03) saturate(1.02) blur(0.3px)",
      desc: "Yüksek performanslı antirefle. Net, canlı ve yansıması minimum bir görüntü.",
      why: "“Gözüm yorulmasın, netlikte taviz vermem” diyen kullanıcılar için. Standart ve düşük seviye antirefle camlara göre bariz fark hissedilir, uzun süre kullanımda konfor sağlar.",
      price: "₺2000"
    },
    99: {
      uv: 99,
      filter: 99,
      overlayColor: "rgba(22,163,74,0.0)",
      imgFilter: "brightness(1) contrast(1.06) saturate(1.03)",
      desc: "En üst seviye. Cam neredeyse görünmez, maksimum netlik ve koruma.",
      why: "Premium segment, en üst kaliteyi isteyen müşteriler için. Standart camlara göre yansıma neredeyse yok, fotoğrafçılar, tasarımcılar ve ekran başında uzun süre çalışanlar için en konforlu tercih.",
      price: "₺3000"
    }
  };

  const greenImage = document.getElementById("greenImage");
  const greenOverlay = document.getElementById("greenOverlay");
  const greenLabel = document.getElementById("greenLabel");
  const greenUv = document.getElementById("greenUv");
  const greenFilter = document.getElementById("greenFilter");
  const greenDesc = document.getElementById("greenDesc");
  const greenWhyText = document.getElementById("greenWhyText");
  const greenPrice = document.getElementById("greenPrice");

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
      why: "Düşük bütçe ve sadece temel koruma isteyen kullanıcılar için. Renk doğruluğu kritik olmayan, sadece hafif mavi ışık kesilmesi istenen durumlarda tercih edilir.",
      price: "₺1400"
    },
    60: {
      uv: 55,
      filter: 60,
      overlayColor: "rgba(252,211,77,0.14)",
      imgFilter: "brightness(0.9) contrast(0.96) saturate(1)",
      desc: "Orta seviye. Sarılık azalmıştır, renkler daha kabul edilebilir hale gelir.",
      why: "Uygun fiyatlı ama sürekli bilgisayar/telefon kullanan biri için mantıklı tercih. Ucuz blue camların aşırı sarılığını istemeyen kullanıcıya hitap eder.",
      price: "₺1900"
    },
    90: {
      uv: 75,
      filter: 90,
      overlayColor: "rgba(252,211,77,0.12)",
      imgFilter: "brightness(1) contrast(1.02) saturate(1.02)",
      desc: "Üst segment. Renkler daha doğru, sarı ton hafif, koruma yüksek.",
      why: "Freelancer, ofis çalışanı, gamer gibi uzun süre ekran başında olan ve hem renkleri çok bozmadan hem de göz koruması isteyen kullanıcılar için dengeli seçim.",
      price: "₺2600"
    },
    99: {
      uv: 99,
      filter: 99,
      overlayColor: "rgba(252,211,77,0.0)",
      imgFilter: "brightness(1.08) contrast(1.05) saturate(1.05)",
      desc: "Premium blue cam. Hem yüksek mavi ışık koruması hem de neredeyse doğal beyaz dengesi.",
      why: "“Gece-gündüz ekran başındayım, hem gözümü korusun hem renkler bozulmasın” diyenler için. Ucuz blue camlara göre sarılık hissi minimum, premium segment ürünü.",
      price: "₺3800"
    }
  };

  const blueImage = document.getElementById("blueImage");
  const blueOverlay = document.getElementById("blueOverlay");
  const blueLabel = document.getElementById("blueLabel");
  const blueUv = document.getElementById("blueUv");
  const blueFilter = document.getElementById("blueFilter");
  const blueDesc = document.getElementById("blueDesc");
  const blueWhyText = document.getElementById("blueWhyText");
  const bluePrice = document.getElementById("bluePrice");

  // ======================
  //   ORTAK GÜNCELLEME (YEŞİL / BLUE)
  // ======================
  function updateSection(type, level) {
    if (type === "green") {
      const cfg = greenConfigs[level];
      if (!cfg) return;

      if (greenImage) greenImage.style.filter = cfg.imgFilter;
      if (greenOverlay) greenOverlay.style.backgroundColor = cfg.overlayColor;
      if (greenLabel) greenLabel.textContent = `Yeşil Antirefle %${level}`;
      if (greenUv) greenUv.textContent = `%${cfg.uv}`;
      if (greenFilter) greenFilter.textContent = `%${cfg.filter}`;
      if (greenDesc) greenDesc.textContent = cfg.desc;
      if (greenWhyText) greenWhyText.textContent = cfg.why;
      if (greenPrice && cfg.price) greenPrice.textContent = cfg.price;
    } else if (type === "blue") {
      const cfg = blueConfigs[level];
      if (!cfg) return;

      if (blueImage) blueImage.style.filter = cfg.imgFilter;
      if (blueOverlay) blueOverlay.style.backgroundColor = cfg.overlayColor;
      if (blueLabel) blueLabel.textContent = `Blue Cam %${level}`;
      if (blueUv) blueUv.textContent = `%${cfg.uv}`;
      if (blueFilter) blueFilter.textContent = `%${cfg.filter}`;
      if (blueDesc) blueDesc.textContent = cfg.desc;
      if (blueWhyText) blueWhyText.textContent = cfg.why;
      if (bluePrice && cfg.price) bluePrice.textContent = cfg.price;
    }
  }

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

  const rxBrandCards = document.querySelectorAll(".rx-brand-card");
  const rxBrandGrid = document.getElementById("rxBrandGrid");
  const rxDetail = document.getElementById("rxDetail");
  const rxBackBtn = document.getElementById("rxBackBtn");

const rxImage = document.getElementById("rxImage");      // TEK FOTO
const rxOverlay = document.getElementById("rxOverlay");  // SADECE FİLTRE OVERLAY
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
  // ======================
  //   KUPON KODU SİSTEMİ
  // ======================
  const couponCodeInput = document.getElementById("couponCodeInput");
  const applyCouponBtn = document.getElementById("applyCouponBtn");
  const couponResult = document.getElementById("couponResult");

  // Buradaki kodları sen isteğine göre değiştirebilirsin
  const couponMap = {
    sila10: 10,
    nazartoros20: 20,
    caglar30: 30
    // örnek: INSTAGRAM15: 15
  };

  if (applyCouponBtn && couponCodeInput && couponResult) {
    applyCouponBtn.addEventListener("click", () => {
      const raw = couponCodeInput.value.trim().toUpperCase();
      couponResult.classList.remove("success", "error");

      if (!raw) {
        couponResult.textContent = "Lütfen bir kupon kodu girin.";
        couponResult.classList.add("error");
        return;
      }

      const rate = couponMap[raw];

      if (!rate) {
        couponResult.textContent = "Geçersiz veya süresi dolmuş kupon.";
        couponResult.classList.add("error");
        return;
      }

      // Geçerli kupon → mesajı göster
      couponResult.textContent = `Kupon onaylandı. Ekstra indirim: %${rate}`;
      couponResult.classList.add("success");

      // Eğer footer'daki iskonto hesap alanı varsa oraya da yazalım
      const discRate = document.getElementById("discRate");
      if (discRate) {
        discRate.value = rate;
      }
    });
  }

  // Slider DOM
  const rxCompare = document.getElementById("rxCompare");
  const rxCompareHandle = document.getElementById("rxCompareHandle");

function setRxComparePosition(percent) {
  if (!rxOverlay || !rxCompareHandle) return;
  const p = Math.min(100, Math.max(0, percent));
  rxOverlay.style.width = p + "%";
  rxCompareHandle.style.left = p + "%";
}


  // Başlangıç orta
  setRxComparePosition(50);

  if (rxCompare) {
    let dragging = false;

    function updateFromClientX(clientX) {
      const rect = rxCompare.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = (x / rect.width) * 100;
      setRxComparePosition(percent);
    }

    function onPointerDown(e) {
      dragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    }

    function onPointerMove(e) {
      if (!dragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    }

    function onPointerUp() {
      dragging = false;
    }

    rxCompare.addEventListener("mousedown", onPointerDown);
    rxCompare.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchend", onPointerUp);
  }

function setRxBrand(brandKey) {
  const cfg = rxConfigs[brandKey];
  if (!cfg) return;

  // Kart active
  rxBrandCards.forEach((c) => {
    c.classList.toggle("active", c.dataset.brand === brandKey);
  });

  // Başlık
  if (rxDetailTitle) rxDetailTitle.textContent = `${cfg.brandName} Cam`;

  // TEK FOTOĞRAF: filtresiz taraf hafif “kötü” (mat, düşük kontrast, hafif blur)
  if (rxImage) {
    rxImage.style.filter =
      "brightness(0.82) contrast(0.86) saturate(0.9) blur(0.45px)";
  }

  if (rxBaseLabel) {
    rxBaseLabel.textContent =
      "Çizginin solu: Filtreli RX Alanı / Sağı: Standart Cam";
  }

  // FİLTRE OVERLAY: markaya göre ton, ama her zaman daha kaliteli görünüm
  if (rxOverlay) {
    // Renk tonu markaya göre:
    rxOverlay.style.backgroundColor =
      cfg.overlayColor || "rgba(37,99,235,0.32)";

    // Kaliteli cam hissi için ekstra netlik (backdrop-filter ile alan bazlı)
    rxOverlay.style.backdropFilter =
      "brightness(1.08) contrast(1.16) saturate(1.12)";
  }

  // Alt veriler
  if (rxBrandName) rxBrandName.textContent = cfg.brandName;
  if (rxUv) rxUv.textContent = `%${cfg.uv}`;
  if (rxFilterRate) rxFilterRate.textContent = `%${cfg.filterRate}`;
  if (rxDesc) rxDesc.textContent = cfg.desc;
  if (rxWhyText) rxWhyText.textContent = cfg.why;
  if (rxStarLabel) rxStarLabel.textContent = cfg.starsLabel || "";
  if (rxPrice && cfg.price) rxPrice.textContent = cfg.price;

  if (rxBadgeUv) {
    rxBadgeUv.textContent = `UV / Mavi Işık Koruma: %${cfg.uv}`;
  }
  if (rxBadgeFilter) {
    rxBadgeFilter.textContent = `Renk Doğruluğu / Kontrast: %${cfg.filterRate}`;
  }

  // Zeiss premium ise rozet/ödül satırı göster
  if (cfg.premium) {
    rxPremiumRow && rxPremiumRow.classList.remove("d-none");
    rxAwardsRow && rxAwardsRow.classList.remove("d-none");
    rxStarsRow && rxStarsRow.classList.remove("d-none");
    rxStar5 && rxStar5.classList.add("premium-star");
  } else {
    rxPremiumRow && rxPremiumRow.classList.add("d-none");
    rxAwardsRow && rxAwardsRow.classList.add("d-none");
    rxStarsRow && rxStarsRow.classList.add("d-none");
    rxStar5 && rxStar5.classList.remove("premium-star");
  }

  // Marka değişince her zaman sıfırdan başlasın (tam filtresiz görüntü)
  setRxComparePosition(50);
}



  function openRxDetail(brandKey) {
    setRxBrand(brandKey);
    if (rxBrandGrid) rxBrandGrid.classList.add("d-none");
    if (rxDetail) rxDetail.classList.remove("d-none");
  }

  rxBrandCards.forEach((card) => {
    card.addEventListener("click", () => {
      const brandKey = card.dataset.brand;
      openRxDetail(brandKey);
    });
  });

  if (rxBackBtn) {
    rxBackBtn.addEventListener("click", () => {
      if (rxDetail) rxDetail.classList.add("d-none");
      if (rxBrandGrid) rxBrandGrid.classList.remove("d-none");
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
        goToTab("green");
        const btn = document.querySelector(
          '.level-btn[data-type="green"][data-level="45"]'
        );
        if (btn) btn.click();
      } else if (useCase === "tech") {
        goToTab("blue");
        const btn = document.querySelector(
          '.level-btn[data-type="blue"][data-level="90"]'
        );
        if (btn) btn.click();
      } else if (useCase === "driver") {
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

  // ======================
  //   İSKONTO HESAPLAMA (FOOTER)
  // ======================
  const discPrice = document.getElementById("discPrice");
  const discRate = document.getElementById("discRate");
  const discCalcBtn = document.getElementById("discCalcBtn");
  const discResult = document.getElementById("discResult");

  if (discCalcBtn) {
    discCalcBtn.addEventListener("click", () => {
      const price = parseFloat(discPrice.value);
      const rate = parseFloat(discRate.value);

      if (!price || !rate) {
        discResult.textContent = "Lütfen fiyat ve oran girin.";
        discResult.classList.remove("d-none");
        return;
      }

      const discounted = price - price * (rate / 100);
      discResult.textContent = `İskontolu Fiyat: ₺${discounted.toFixed(2)}`;
      discResult.classList.remove("d-none");
    });
  }
});
