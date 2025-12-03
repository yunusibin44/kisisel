document.addEventListener("DOMContentLoaded", () => {
  // ======================
  //   ŞANS ÇARKI – EK İSKONTO
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
      wheelSegments.forEach((seg) => seg.classList.remove("active"));

      const idx = Math.floor(Math.random() * wheelSegments.length);
      const selectedDiscount = wheelDiscounts[idx];
      const selectedSegment = wheelSegments[idx];

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
  //   TEMEL GÖRSELLER & OVERLAY'LER
  // ======================
  const greenImage   = document.getElementById("greenImage");
  const blueImage    = document.getElementById("blueImage");
  const rxImage      = document.getElementById("rxImage");

  const greenOverlay = document.getElementById("greenOverlay");
  const blueOverlay  = document.getElementById("blueOverlay");
  const rxOverlay    = document.getElementById("rxOverlay");

  // Filtreli cam = temel fotoğraf → net ve kaliteli olsun
  if (greenImage) {
    greenImage.style.filter = "brightness(1.04) contrast(1.06) saturate(1.04) blur(0.9px)";
  }
  if (blueImage) {
    blueImage.style.filter = "brightness(1.05) contrast(1.08) saturate(1.05) blur(0.9px)";
  }
  if (rxImage) {
    rxImage.style.filter = "brightness(1.06) contrast(1.10) saturate(1.06)";
  }

  // Filtresiz taraf overlay içinde → biraz puslu, mat
  if (greenOverlay) {
    greenOverlay.style.backgroundColor = "rgba(22, 163, 74, 0.1)";
    greenOverlay.style.backdropFilter =
      "brightness(1.50) contrast(0.90) saturate(0.90) blur(0.9px)";
  }
  if (blueOverlay) {
    blueOverlay.style.backgroundColor = "rgba(221, 202, 33, 0.35)";
    blueOverlay.style.backdropFilter =
      "brightness(1.20) contrast(0.90) saturate(0.90) blur(0.9px)";
  }
  // rxOverlay renk + filter'ı marka bazlı aşağıda güncellenecek

  // ======================
  //   ORTAK KAYDIRMALI SLIDER (Yeşil / Blue / RX)
  // ======================
  function setupCompareSlider(frameId, overlayId, handleId, initialPercent = 50) {
    const frame = document.getElementById(frameId);
    const overlay = document.getElementById(overlayId);
    const handle = document.getElementById(handleId);

    if (!frame || !overlay || !handle) return () => {};

    // overlay = SAĞ TARAF (filtresiz / puslu alan)
    function setPosition(percent) {
      const p = Math.min(100, Math.max(0, percent));

      // Sağ tarafı kaplayacak şekilde: soldan p%, genişlik (100-p)%
      overlay.style.left = p + "%";
      overlay.style.width = 100 - p + "%";

      handle.style.left = p + "%";
    }

    // İlk pozisyon ortadan başlasın
    setPosition(initialPercent);

    let dragging = false;

    function updateFromClientX(clientX) {
      const rect = frame.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = (x / rect.width) * 100;
      setPosition(percent);
    }

    function onPointerDown(e) {
      e.preventDefault(); // text seçimi vs. kapat
      dragging = true;
      document.body.classList.add("no-select");

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    }

    function onPointerMove(e) {
      if (!dragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    }

    function onPointerUp() {
      if (!dragging) return;
      dragging = false;
      document.body.classList.remove("no-select");
    }

    frame.addEventListener("mousedown", onPointerDown);
    frame.addEventListener("touchstart", onPointerDown, { passive: false });

    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("touchmove", onPointerMove, { passive: false });

    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchend", onPointerUp);
    window.addEventListener("touchcancel", onPointerUp);

    frame.addEventListener("dragstart", (e) => e.preventDefault());

    return setPosition;
  }

  // Green / Blue / RX için slider kur
  const setGreenCompare = setupCompareSlider(
    "greenCompare",
    "greenOverlay",
    "greenHandle",
    50
  );
  const setBlueCompare = setupCompareSlider(
    "blueCompare",
    "blueOverlay",
    "blueHandle",
    50
  );
  const setRxCompare = setupCompareSlider(
    "rxCompare",
    "rxOverlay",
    "rxCompareHandle",
    50
  );

  // ======================
  //   YEŞİL ANTİREFLE – SABİT METİNLER
  // ======================
  const greenLabel = document.getElementById("greenLabel");
  const greenUv = document.getElementById("greenUv");
  const greenFilter = document.getElementById("greenFilter");
  const greenDesc = document.getElementById("greenDesc");
  const greenWhyText = document.getElementById("greenWhyText");
  const greenPrice = document.getElementById("greenPrice");

  if (greenLabel)
    greenLabel.textContent =
      "Çizginin solu: Filtreli Yeşil Antirefle / Sağı: Standart Cam";
  if (greenUv) greenUv.textContent = "%60";
  if (greenFilter) greenFilter.textContent = "%70";
  if (greenDesc)
    greenDesc.textContent =
      "Yeşil antirefle kaplama, özellikle yansıma ve parlama yapan ortamlarda camın üzerindeki ışık yansımalarını ciddi oranda azaltır.";
  if (greenWhyText)
    greenWhyText.textContent =
      "Gece araç kullanan, ofis + dış mekan karışık kullanan ve gözünün daha az yorulmasını isteyen kullanıcılar için ideal bir çözümdür.";
  if (greenPrice) greenPrice.textContent = "₺2.000-₺6.000";

  // ======================
  //   BLUE CAM – SABİT METİNLER
  // ======================
  const blueLabel = document.getElementById("blueLabel");
  const blueUv = document.getElementById("blueUv");
  const blueFilter = document.getElementById("blueFilter");
  const blueDesc = document.getElementById("blueDesc");
  const blueWhyText = document.getElementById("blueWhyText");
  const bluePrice = document.getElementById("bluePrice");

  if (blueLabel)
    blueLabel.textContent =
      "Çizginin solu: Filtreli Blue Cam / Sağı: Standart Cam";
  if (blueUv) blueUv.textContent = "%65";
  if (blueFilter) blueFilter.textContent = "%70";
  if (blueDesc)
    blueDesc.textContent =
      "Blue cam, ekranlardan gelen zararlı mavi ışığı filtreler; göz yanması, baş ağrısı ve uyku düzeni bozulmasını azaltmaya yardımcı olur.";
  if (blueWhyText)
    blueWhyText.textContent =
      "Bilgisayar, telefon, tablet gibi ekranlara gün içinde uzun süre bakan kullanıcılar için, özellikle ofis çalışanları ve öğrenciler için tasarlanmıştır.";
  if (bluePrice) bluePrice.textContent = "₺2.800-₺7.000";

  // ======================
  //   RX CAMLAR
  // ======================
  const rxConfigs = {
    nikon: {
      brandName: "Nikon RX",
      uv: 95,
      filterRate: 90,
      overlayColor: "rgba(59,130,246,0.22)",
      desc: "Nikon RX camlar, yüksek çözünürlüklü optik yapısı ve ince film kaplaması ile net, temiz ve yansıması minimize edilmiş bir görüntü sunar.",
      why: "Hem netlik hem yansıma kontrolü isteyen, görüntü kalitesine önem veren kullanıcılar için. Özellikle detaylı iş yapanlar (optisyen, tasarımcı, mühendis vb.) için ideal seçim.",
      starsLabel: "Yüksek performans cam",
      premium: false,
      price: "₺12.600 – ₺41.100"
    },
    kodak: {
      brandName: "Kodak RX",
      uv: 90,
      filterRate: 85,
      overlayColor: "rgba(248,113,113,0.24)",
      desc: "Kodak RX camlar, günlük kullanım konforuna odaklanır; daha yumuşak kontrast ve göz yormayan bir parlaklık sunar.",
      why: "Gün boyu takacağım, her ortamda rahatsız etmeyen, yumuşak ve konforlu bir cam olsun diyen müşteriler için. Fiyat/performans RX tercihi.",
      starsLabel: "Konfor odaklı cam",
      premium: false,
      price: "₺10.400 – ₺48.900"
    },
    zeiss: {
      brandName: "Zeiss RX",
      uv: 99,
      filterRate: 95,
      overlayColor: "rgba(37,99,235,0.28)",
      desc: "Zeiss RX camlar, premium optik kalitesi ile maksimum detay, yüksek kontrast ve çok düşük yansıma sağlar.",
      why: "Marka, kalite ve performansta en üst segmenti isteyenler için. Fotoğraf, tasarım, detaylı okuma ve gece sürüşü yapan kullanıcılar Zeiss farkını net şekilde hisseder.",
      starsLabel: "Premium, ödüllü cam teknolojisi",
      premium: true,
      price: "₺13.400 – ₺66.000"
    }
  };

  const rxBrandCards = document.querySelectorAll(".rx-brand-card");
  const rxBrandGrid = document.getElementById("rxBrandGrid");
  const rxDetail = document.getElementById("rxDetail");
  const rxBackBtn = document.getElementById("rxBackBtn");

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

    rxBrandCards.forEach((c) => {
      c.classList.toggle("active", c.dataset.brand === brandKey);
    });

    if (rxDetailTitle) rxDetailTitle.textContent = `${cfg.brandName} Cam`;

    // Çizginin solu: filtreli (temel fotoğraf zaten net ayarlı)
    if (rxBaseLabel) {
      rxBaseLabel.textContent =
        "Çizginin solu: Filtreli RX Alanı / Sağı: Standart Cam";
    }

    // Sağ taraf (overlay) = filtresiz/puslu alan
    if (rxOverlay) {
      rxOverlay.style.backgroundColor =
        cfg.overlayColor || "rgba(37,99,235,0.32)";
      rxOverlay.style.backdropFilter =
        "brightness(1.10) contrast(0.90) saturate(0.90) blur(0.9px)";
    }

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

    if (typeof setRxCompare === "function") setRxCompare(50);
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
  //   KUPON KODU SİSTEMİ
  // ======================
  const couponCodeInput = document.getElementById("couponCodeInput");
  const applyCouponBtn = document.getElementById("applyCouponBtn");
  const couponResult = document.getElementById("couponResult");

  const couponMap = {
    SİLA10: 10,
    NAZARTOROS20: 20,
    CAGLAR30: 30
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

      couponResult.textContent = `Kupon onaylandı. Ekstra indirim: %${rate}`;
      couponResult.classList.add("success");

      const discRate = document.getElementById("discRate");
      if (discRate) {
        discRate.value = rate;
      }
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
      } else if (useCase === "tech") {
        goToTab("blue");
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
