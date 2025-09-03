window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
  
    if (window.scrollY > 25) {
      if (header) {
        header.classList.add('fixed-top');
      }
    } else {
      if (header) {
        header.classList.remove('fixed-top');
      }
    }
  });



//   

document.addEventListener("DOMContentLoaded", function () {
    var mobileBtn = document.querySelector(".menu_icon");
    var sideMenu = document.querySelector(".side-menu");
    var sideMenuCloseBtn = document.querySelector(".side-menu-close-btn img");

    // Check if elements exist before adding event listeners
    if (mobileBtn && sideMenu) {
        mobileBtn.addEventListener("click", () => {
            sideMenu.classList.add("active");
            // document.body.style.position = "fixed";
            // document.body.style.width = "100%";
        });
    }

    if (sideMenuCloseBtn) {
        sideMenuCloseBtn.addEventListener("click", () => {
            sideMenu.classList.remove("active");
        });
    }

    document.addEventListener("click", (event) => {
        if (sideMenu && mobileBtn && !sideMenu.contains(event.target) && !mobileBtn.contains(event.target)) {
            sideMenu.classList.remove("active");
            // document.body.style.position = "relative";
        }
    });

    document.querySelectorAll(".mobile-menu > ul > li > a").forEach((item) => {
        item.addEventListener("click", function (event) {
            const submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains("submenu")) {
                const isOpen = submenu.style.display === "block";

                if (!isOpen) {
                    event.preventDefault();
                    document.querySelectorAll(".mobile-menu .submenu").forEach((sub) => {
                        sub.style.display = "none";
                    });
                    submenu.style.display = "block";
                }
            }
        });
    });
});



// scroll animation

class LogosMarquee {
	constructor({
		containerSelector = ".marquee__ctn",
		trackSelector = ".marquee__track",
		speed = 20 // pixels per second
	} = {}) {
		this.container = document.querySelector(containerSelector);
		this.track = document.querySelector(trackSelector);
		this.speed = speed;

		if (!this.container || !this.track) {
			console.warn("Marquee: éléments introuvables.");
			return;
		}

		this.trackWidth = this.track.getBoundingClientRect().width;
		this.pos = 0;
		this.start = null;
		this.rafId = null;

		this.setup();
		this.animate = this.animate.bind(this); // Bind pour requestAnimationFrame
		requestAnimationFrame(this.animate);
	}

	setup() {
		// Étendre la largeur du container
		this.container.style.width = `${this.trackWidth}px`;

		// Dupliquer le contenu pour boucler visuellement
		this.clone = this.track.cloneNode(true);
		this.container.appendChild(this.clone);

		// Optimisation mobile
		this.container.style.willChange = "transform";
	}

	animate(timestamp) {
		if (!this.start) this.start = timestamp;

		const elapsed = timestamp - this.start;
		this.pos = -(elapsed / 1500) * this.speed;

		if (Math.abs(this.pos) >= this.trackWidth) {
			this.start = timestamp;
			this.pos = 0;
		}

		this.container.style.transform = `translateX(${this.pos}px)`;

		this.rafId = requestAnimationFrame(this.animate);
	}

	destroy() {
		cancelAnimationFrame(this.rafId);
		if (this.clone) this.clone.remove();
		this.container.style.transform = "";
		this.container.style.willChange = "";
	}
}

window.addEventListener("load", () => {
	const marquee = new LogosMarquee({
		containerSelector: ".marquee__ctn",
		trackSelector: ".marquee__track",
		speed: 80
	});

	// Si besoin, tu peux le détruire plus tard :
	// marquee.destroy();
});