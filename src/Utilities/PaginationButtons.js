import {useState} from 'react'

export default function PaginationButtons({ totalPages, currentPage, setCurrentPage }) {
    const [activeButton, setActiveButton] = useState(null);
  
    const paginationStyle = {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px', // Adjust as needed
      marginBottom: '20px', // Adjust as needed
      marginLeft:"14rem"
    };
  
    const handleClick = (pageNumber, buttonType) => {
      setCurrentPage(pageNumber);
      setActiveButton(buttonType);
    };
  
    return (
      <div style={paginationStyle}>
        <button 
          onClick={() => handleClick(currentPage - 1, 'prev')} 
          disabled={currentPage === 1}
          style={activeButton === 'prev' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
        >
          {'<'} {/* Left-pointing arrow */}
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handleClick(i + 1, 'page')}
            style={i + 1 === currentPage ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
          >
            {i + 1}
          </button>
        ))}
        <button 
          onClick={() => handleClick(currentPage + 1, 'next')} 
          disabled={currentPage === totalPages}
          style={activeButton === 'next' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
        >
          {'>'} {/* Right-pointing arrow */}
        </button>
      </div>
    );
  }
  
  const buttonStyle = {
    backgroundColor: 'ghostwhite',
    color: 'darkgrey',
    border: 'none',
    fontWeight: 'bold',
   
    padding: '5px 10px',
    margin: '0 2px',
    cursor: 'pointer',
    borderRadius: '5px',
  };
  
  const activeButtonStyle = {
    color: 'black',
    fontWeight: 'bold',
  };