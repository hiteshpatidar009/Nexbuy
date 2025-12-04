import React from 'react';
import { Linkedin, Instagram, Github } from 'lucide-react';
import webdev from "./nexPhoto/Puweb-Development Logo.gif"
import ShopLogo  from "./nexPhoto/Shop Logo.gif"
 
const footerStyle = {
  width: '100%',
  backgroundColor: 'white',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  padding: '1.5rem 0',
  marginTop: 'auto'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1rem'
};

const footerContentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const logoStyle = {
  width: '200px',
  height: '150px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
};

const logoLeftStyle = {
  ...logoStyle,
  border: '2px solid #d1d5db'
};

const logoRightStyle = {
  ...logoStyle,
  border: '2px solid #93c5fd',
  backgroundColor: '#e0f2fe'
};

const imgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const centerContentStyle = {
  textAlign: 'center'
};

const navLinksStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem'
};

const navLinkStyle = {
  color: '#4b5563',
  textDecoration: 'none',
  margin: '0.25rem 0',
  transition: 'color 0.2s'
};

const socialLinksStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1rem'
};

const socialLinkStyle = {
  color: '#4b5563',
  margin: '0 0.75rem',
  transition: 'color 0.2s'
};

const copyrightStyle = {
  fontSize: '0.875rem',
  color: '#6b7280'
};

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={footerContentStyle}>
          {/* Left Logo */}
          <div style={logoLeftStyle}>
            <img 
              src={ShopLogo} 
              alt="Company Logo 1" 
              style={imgStyle} 
            />
          </div>
          
          {/* Center Content */}
          <div style={centerContentStyle}>
            <div style={navLinksStyle}>
              <a 
                href="#" 
                style={navLinkStyle}
                onMouseOver={(e) => e.target.style.color = '#2563eb'}
                onMouseOut={(e) => e.target.style.color = '#4b5563'}
              >
                Home
              </a>
              <a 
                href="#" 
                style={navLinkStyle}
                onMouseOver={(e) => e.target.style.color = '#2563eb'}
                onMouseOut={(e) => e.target.style.color = '#4b5563'}
              >
                About
              </a>
              <a 
                href="#" 
                style={navLinkStyle}
                onMouseOver={(e) => e.target.style.color = '#2563eb'}
                onMouseOut={(e) => e.target.style.color = '#4b5563'}
              >
                Services
              </a>
              <a 
                href="#" 
                style={navLinkStyle}
                onMouseOver={(e) => e.target.style.color = '#2563eb'}
                onMouseOut={(e) => e.target.style.color = '#4b5563'}
              >
                Contact
              </a>
            </div>
            
            {/* Social Media Icons */}
            <div style={socialLinksStyle}>
              <a 
                href="#" 
                style={socialLinkStyle}
                onMouseOver={(e) => e.target.style.color = '#0077b5'}
                onMouseOut={(e) => e.target.style.color = '#4b5563'}
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="#" 
                style={socialLinkStyle}
                onMouseOver={(e) => e.target.style.color = '#e1306c'}
                onMouseOut={(e) => e.target.style.color = '#4b5563'}
              >
                <Instagram size={24} />
              </a>
              <a 
                href="#" 
                style={socialLinkStyle}
                onMouseOver={(e) => e.target.style.color = '#333'}
                onMouseOut={(e) => e.target.style.color = '#4b5563'}
              >
                <Github size={24} />
              </a>
            </div>
            
            <p style={copyrightStyle}>
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
          
          {/* Right Logo */}
          <div style={logoRightStyle}>
            <img 
              src={webdev} 
              alt="Company Logo 2" 
              style={imgStyle} 
            />
          </div>
        </div>
      </div>
    </footer>
  );
}