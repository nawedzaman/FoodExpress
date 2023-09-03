import searchIcon from "../assests/search.svg";
import cancelIcon from "../assests/cancel.png";
const Search = ({ handleSearch, handleCancel, searchText, showCancelIcon }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={searchText}
        placeholder="Search for restaurants"
        onChange={(e) => handleSearch(e.target.value)}
      />
      {showCancelIcon ? (
        <i className="cancel-icon" onClick={handleCancel}>
          <img src={cancelIcon} alt="Cancel" />
        </i>
      ) : (
        <i className="search-icon">
          <img src={searchIcon} alt="Search" />
        </i>
      )}
    </div>
  );
};

export default Search;
