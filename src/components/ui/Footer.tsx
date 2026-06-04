export default function Footer() {
  return (
    <div className="">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand">MD <span style={{ color: "var(--green-2)" }}>MAHMUD</span></div>
            <p>Graphics Designer & Video Editor crafting scroll-stopping visuals for brands worldwide.</p>
          </div>
          
          <div>
            <h5>Important</h5>
            <ul className="text-[14px] text-gray-400">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Service</a></li>
              <li><a href="#projects">Projects</a></li>
            </ul>
          </div>
          
          <div>
            <h5>Service</h5>
            <ul className="text-[14px] text-gray-400">
              <li><a href="#services">Thumbnail</a></li>
              <li><a href="#services">Ad Design</a></li>
              <li><a href="#services">Video Edit</a></li>
            </ul>
          </div>
          
          <div>
            <h5>Information</h5>
            <ul className="text-[14px] text-gray-400">
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">&copy; 2026 Md Mahmud. All rights reserved.</div>
      </div>
    </div>
  );
}
