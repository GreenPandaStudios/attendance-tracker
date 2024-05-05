import React, { useState } from 'react';
interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion ${isOpen ? 'open' : 'closed'}`}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <p>{title}</p>
        <span className={`icon ${isOpen ? 'open' : ''}`}>&#9660;</span>
      </div>
      <div className={`accordion-content ${isOpen ? 'open' : 'closed'}`}>{children}</div>
    </div>
  );
};

export default Accordion;
