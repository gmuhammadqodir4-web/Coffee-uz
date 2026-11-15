
import React, { useState } from "react";
import "./index.css";

const products = [
  { id: 1, name: "Espresso", category: "Hot Coffee", price: 18000, image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600" },
  { id: 2, name: "Cappuccino", category: "Hot Coffee", price: 28000, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600" },
  { id: 3, name: "Caffe Latte", category: "Hot Coffee", price: 30000, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600" },
  { id: 4, name: "Iced Coffee", category: "Cold Coffee", price: 32000, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600" },
  { id: 5, name: "Caramel Macchiato", category: "Hot Coffee", price: 35000, image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600" },
  { id: 6, name: "Mocha", category: "Hot Coffee", price: 33000, image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600" },
  { id: 7, name: "Cold Brew", category: "Cold Coffee", price: 29000, image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600" },
  { id: 8, name: "Vanilla Frappe", category: "Cold Coffee", price: 38000, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600" },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("uz-UZ").format(price) + " so'm";

function App() {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      category === "All" || product.category === category;
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const addToCart = (product) => {
    setCart((oldCart) => {
      const exists = oldCart.find((item) => item.id === product.id);

      if (exists) {
        return oldCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...oldCart, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (id, amount) => {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <a href="#home" className="logo">
          <span className="logo-icon">☕</span>
          COFFEE<span>HOUSE.</span>
        </a>

        <nav className={menuOpen ? "nav-links active" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#menu" onClick={() => setMenuOpen(false)}>Our Menu</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        <div className="nav-actions">
          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
          >
            🛒 <span>Cart</span>
            <b>{cartCount}</b>
          </button>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-label">
            <span>✦</span> FRESHLY ROASTED EVERY DAY
          </div>

          <h1>
            Start Your Day
            <br />
            With <span>Great Coffee.</span>
          </h1>

          <p>
            Every cup tells a story. Discover the rich taste,
            wonderful aroma and unforgettable experience
            of our freshly brewed coffee.
          </p>

          <div className="hero-buttons">
            <a href="#menu" className="primary-button">
              Explore Menu <span>→</span>
            </a>
            <a href="#about" className="secondary-button">
              Discover More
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <h3>15+</h3>
              <p>Years Experience</p>
            </div>
            <div>
              <h3>50+</h3>
              <p>Coffee Types</p>
            </div>
            <div>
              <h3>10k+</h3>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1000"
            alt="Fresh coffee"
          />
          <div className="floating-card">
            <span>☕</span>
            <div>
              <strong>Premium Coffee</strong>
              <small>Made with love</small>
            </div>
          </div>
          <div className="round-text">GOOD COFFEE • GOOD MOOD •</div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature">
          <span>🌱</span>
          <div>
            <h3>Fresh Beans</h3>
            <p>Carefully selected coffee beans</p>
          </div>
        </div>
        <div className="feature">
          <span>☕</span>
          <div>
            <h3>Best Quality</h3>
            <p>Perfect taste in every cup</p>
          </div>
        </div>
        <div className="feature">
          <span>🚚</span>
          <div>
            <h3>Fast Delivery</h3>
            <p>Your coffee arrives fresh</p>
          </div>
        </div>
        <div className="feature">
          <span>❤️</span>
          <div>
            <h3>Made With Love</h3>
            <p>Prepared by coffee experts</p>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="menu-section" id="menu">
        <div className="section-heading">
          <span className="section-label">OUR SPECIAL MENU</span>
          <h2>Discover Our <span>Products</span></h2>
          <p>
            Explore our delicious coffee selection, made
            with carefully selected ingredients.
          </p>
        </div>

        <div className="menu-controls">
          <div className="categories">
            {["All", "Hot Coffee", "Cold Coffee"].map((item) => (
              <button
                key={item}
                className={category === item ? "category active" : "category"}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search coffee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <span className="product-tag">BEST SELLER</span>
                <button
                  className="quick-add"
                  onClick={() => addToCart(product)}
                  aria-label={`Add ${product.name} to cart`}
                >
                  +
                </button>
              </div>

              <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3>{product.name}</h3>
                <div className="product-bottom">
                  <strong>{formatPrice(product.price)}</strong>
                  <button onClick={() => addToCart(product)}>
                    Add to cart +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="empty-message">Coffee not found ☕</p>
        )}
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900"
            alt="Coffee preparation"
          />
          <div className="about-experience">
            <strong>15+</strong>
            <span>Years of<br />Experience</span>
          </div>
        </div>

        <div className="about-content">
          <span className="section-label">OUR STORY</span>
          <h2>More Than Coffee, It's An <span>Experience.</span></h2>
          <p>
            We believe that coffee is more than just a drink.
            It is a moment of happiness, a reason to connect
            and a perfect way to start your day.
          </p>
          <p>
            Our team carefully selects the finest beans and
            prepares every cup with passion and attention to detail.
          </p>

          <div className="about-points">
            <div>✓ Premium selected coffee beans</div>
            <div>✓ Professional baristas</div>
            <div>✓ Fresh and natural ingredients</div>
          </div>

          <a href="#contact" className="primary-button">
            Learn More →
          </a>
        </div>
      </section>

      {/* SPECIAL OFFER */}
      <section className="offer-section">
        <div className="offer-content">
          <span>LIMITED TIME OFFER</span>
          <h2>Good Coffee.<br />Great Moments.</h2>
          <p>Get 20% OFF on your first coffee order!</p>
          <a href="#menu" className="offer-button">Order Now →</a>
        </div>
        <img
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800"
          alt="Special coffee"
        />
      </section>

      {/* REVIEWS */}
      <section className="reviews-section" id="reviews">
        <div className="section-heading">
          <span className="section-label">CUSTOMER REVIEWS</span>
          <h2>What People <span>Say About Us</span></h2>
          <p>Our customers make every cup more special.</p>
        </div>

        <div className="reviews-grid">
          {[
            {
              name: "Alex Morgan",
              job: "Regular Customer",
              text: "Amazing coffee! The atmosphere is beautiful and the service is excellent. Definitely my favorite place.",
              avatar: "https://i.pravatar.cc/100?img=12",
            },
            {
              name: "Sarah Johnson",
              job: "Coffee Lover",
              text: "The cappuccino is incredible. Fresh coffee, friendly staff and a wonderful experience every time.",
              avatar: "https://i.pravatar.cc/100?img=47",
            },
            {
              name: "Daniel Smith",
              job: "Regular Customer",
              text: "One of the best coffee places I have ever visited. I highly recommend their caramel macchiato!",
              avatar: "https://i.pravatar.cc/100?img=13",
            },
          ].map((review, index) => (
            <div className="review-card" key={index}>
              <div className="stars">★★★★★</div>
              <p>"{review.text}"</p>
              <div className="review-user">
                <img src={review.avatar} alt={review.name} />
                <div>
                  <strong>{review.name}</strong>
                  <small>{review.job}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div>
          <span className="section-label">COME VISIT US</span>
          <h2>Let's Have A <span>Coffee!</span></h2>
          <p>We are waiting for you. Come and enjoy your favorite coffee.</p>
        </div>
        <div className="contact-details">
          <div>📍 Tashkent, Uzbekistan</div>
          <div>☎ +998 90 123 45 67</div>
          <div>🕒 Every day: 08:00 – 23:00</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="logo">
              ☕ COFFEE<span>HOUSE.</span>
            </a>
            <p>
              Great coffee brings people together.
              Enjoy every moment with us.
            </p>
          </div>

          <div>
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#menu">Our Menu</a>
            <a href="#about">About Us</a>
            <a href="#reviews">Reviews</a>
          </div>

          <div>
            <h3>Our Menu</h3>
            <a href="#menu">Espresso</a>
            <a href="#menu">Cappuccino</a>
            <a href="#menu">Latte</a>
            <a href="#menu">Cold Coffee</a>
          </div>

          <div>
            <h3>Contact Us</h3>
            <p>Tashkent, Uzbekistan</p>
            <p>+998 90 123 45 67</p>
            <p>hello@coffeehouse.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Coffee House. All rights reserved.</p>
          <p>Made with ☕ and ❤️</p>
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Cart 🛒</h2>
              <button onClick={() => setCartOpen(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <span>☕</span>
                <h3>Your cart is empty</h3>
                <p>Add your favorite coffee!</p>
                <button onClick={() => setCartOpen(false)}>
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <strong>{formatPrice(item.price * item.quantity)}</strong>
                        <div className="quantity">
                          <button onClick={() => changeQuantity(item.id, -1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <div>
                    <span>Total:</span>
                    <strong>{formatPrice(total)}</strong>
                  </div>
                  <button
                    onClick={() => alert("Buyurtmangiz qabul qilindi! ☕")}
                  >
                    Checkout →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;