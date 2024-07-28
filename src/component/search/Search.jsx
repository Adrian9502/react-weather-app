import PropTypes from "prop-types";

export default function Search({ search, setSearch, handleSearch }) {
  return (
    <div className="my-4">
      <div className="input-group">
        <form className="w-100" onSubmit={handleSearch}>
          <div className="input-group mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Enter city name"
              name="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Prop types validation
Search.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
