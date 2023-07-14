import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Consultpsy.css";

function Consultpsy() {
  const [showMoreLocations, setShowMoreLocations] = useState(false);
  const [displayCount, setDisplayCount] = useState(15);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRatingFilters, setSelectedRatingFilters] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [selectedPriceFilters, setSelectedPriceFilters] = useState([]);
  const [selectedExpFilters, setSelectedExpFilters] = useState([]);
  const [selectedLocFilters, setSelectedLocFilters] = useState([]);
  const [selectedGenFilters, setSelectedGenFilters] = useState([]);
  const [selectedDegFilters, setSelectedDegFilters] = useState([]);
  const [selectedLangFilters, setSelectedLangFilters] = useState([]);
  
  const [psy, setPsy] = useState([]);
  useEffect(() => {
    fetch("/getPsy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setPsy(data));
  }, []);

  
  const handleShowMore = () => {
    setDisplayCount(displayCount + 15); // Increase the display count by 15
  };

  const handleShowLess = () => {
    setDisplayCount(15); // Show initial count of items (15)
  };

  
  const sortPsy = (data) => {
    if (selectedSortOption === "Rating - High to Low") {
      return data.sort((a, b) => b[2] - a[2]);
    } else if (selectedSortOption === "Fee - Low to High") {
      return data.sort((a, b) => a[9] - b[9]);
    } else if (selectedSortOption === "Fee - High to Low") {
      return data.sort((a, b) => b[9] - a[9]);
    } else if (selectedSortOption === "Experience - High to Low") {
      return data.sort((a, b) => b[3] - a[3]);
    } else {
      return data;
    }
  };
  const handleRatingFilter = (ratingOption) => {
    if (selectedRatingFilters.includes(ratingOption)) {
      setSelectedRatingFilters(selectedRatingFilters.filter(option => option !== ratingOption));
    } else {
      setSelectedRatingFilters([...selectedRatingFilters, ratingOption]);
    }
  };

  const handlePriceFilter = (minPrice, maxPrice) => {
    const filter = { minPrice, maxPrice };
    if (selectedPriceFilters.some((option) => option.minPrice === minPrice && option.maxPrice === maxPrice)) {
      setSelectedPriceFilters(selectedPriceFilters.filter((option) => option.minPrice !== minPrice || option.maxPrice !== maxPrice));
    } else {
      setSelectedPriceFilters([...selectedPriceFilters, filter]);
    }
  };

  const handleExpFilter = (minExp, maxExp) => {
    const filter = { minExp, maxExp };
    if (selectedExpFilters.some((option) => option.minExp === minExp && option.maxExp === maxExp)) {
      setSelectedExpFilters(selectedExpFilters.filter((option) => option.minExp !== minExp || option.maxExp !== maxExp));
    } else {
      setSelectedExpFilters([...selectedExpFilters, filter]);
    }
  };
  const handleLocFilter = (locOption) => {
    if (selectedLocFilters.includes(locOption)) {
      setSelectedLocFilters(selectedLocFilters.filter(option => option !== locOption));
    } else {
      setSelectedLocFilters([...selectedLocFilters, locOption]);
    }
  };
  const handleGenFilter = (genderOption) => {
    if (selectedGenFilters.includes(genderOption)) {
      setSelectedGenFilters(selectedGenFilters.filter(option => option !== genderOption));
    } else {
      setSelectedGenFilters([...selectedGenFilters, genderOption]);
    }
  };
  const handleDegFilter = (degOption) => {
    if (selectedDegFilters.includes(degOption)) {
      setSelectedDegFilters(selectedLocFilters.filter(option => option !== degOption));
    } else {
      setSelectedDegFilters([...selectedDegFilters, degOption]);
    }
  };
  const handleLangFilter = (langOption) => {
    if (selectedLangFilters.includes(langOption)) {
      setSelectedLangFilters(selectedLangFilters.filter(option => option !== langOption));
    } else {
      setSelectedLangFilters([...selectedLangFilters, langOption]);
    }
  };

  const filteredPsy = psy
    .filter(p => p[1].toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(p => selectedRatingFilters.length === 0 || selectedRatingFilters.some(option => option <= p[2]))
    .filter((p) => {
      if (selectedPriceFilters.length === 0) return true;
      return selectedPriceFilters.some((filter) => p[9] >= filter.minPrice && p[9] <= filter.maxPrice);
    })
    .filter((p) => {
      if (selectedExpFilters.length === 0) return true;
      return selectedExpFilters.some((filter) => p[3] >= filter.minExp && p[3] <= filter.maxExp);
    })
    .filter(p => selectedLocFilters.length === 0 || selectedLocFilters.includes(p[4]))
    .filter(p => selectedGenFilters.length === 0 || selectedGenFilters.includes(p[5]))
    .filter(p => selectedDegFilters.length === 0 || selectedDegFilters.includes(p[6]))
    .filter(p => selectedLangFilters.length === 0 || selectedLangFilters.includes(p[7]));
    

    
  const sortedPsy = sortPsy(filteredPsy);
  const displayedPsy = sortedPsy.slice(0, displayCount);

  const sortOptions = [
    {
      sortOption: "Rating - High to Low",
    },
    {
      sortOption: "Fee - Low to High",
    },
    {
      sortOption: "Fee - High to Low",
    },
    {
      sortOption: "Experience - High to Low",
    },
  ];

  const ratingFilters = [
    {
      ratingOption: "5",
    },
    {
      ratingOption: "4 and above",
    },
    {
      ratingOption: "3 and above",
    },
    {
      ratingOption: "2 and above",
    },
  ];

  const priceFilters = [
    {
      priceOption: "Rs. 5000 and above",
      maxPrice:100000,
      minPrice:5000,
    },
    {
      priceOption: "Between Rs. 3000 and Rs. 5000",
      maxPrice:5000,
      minPrice:3000,
    },
    {
      priceOption: "Between Rs. 2000 and Rs. 3000",
      maxPrice:3000,
      minPrice:2000,
    },
    {
      priceOption: "Between Rs. 1000 and Rs. 2000",
      maxPrice:2000,
      minPrice:1000,
    },
    {
      priceOption: "Below Rs. 1000",
      maxPrice:1000,
      minPrice:0,
    },
  ];

  const expFilters = [
    {
      expOption: ">25 years",
      minExp:25,
      maxExp:100,
    },
    {
      expOption: "Between 15 and 25 years",
      minExp:15,
      maxExp:25,
    },
    {
      expOption: "Between 10 and 15 years",
      minExp:10,
      maxExp:15,
    },
    {
      expOption: "Between 5 and 10 years",
      minExp:5,
      maxExp:10,
    },
    {
      expOption: "Between 1 and 5 years",
      minExp:1,
      maxExp:5,
    },
    {
      expOption: "< 1 year",
      minExp:0,
      maxExp:1,
    },
  ];

  const locationFilters = [
    {
      locOption: "Mumbai",
    },
    {
      locOption: "Nagpur",
    },
    {
      locOption: "Pune",
    },
    {
      locOption: "Surat",
    },
    {
      locOption: "Ahmedabad",
    },
    {
      locOption: "Rajkot",
    },
    {
      locOption: "Bhavnagar",
    },
    {
      locOption: "Delhi",
    },
    {
      locOption: "Chennai",
    },
    {
      locOption: "Kolkata",
    },
  ];

  const genderFilters = [
    {
      genderOption: "Male",
    },
    {
      genderOption: "Female",
    },
  ];

  const degreeFilters = [
    {
      degOption: "B.A.",
    },
    {
      degOption: "B.S.",
    },
    {
      degOption: "M.A.",
    },
    {
      degOption: "M.S.",
    },
    {
      degOption: "Ph.D",
    },
    {
      degOption: "Psy.D",
    },
    {
      degOption: "Psy.S",
    },
  ];

  const langFilters = [
    {
      langOption: "English",
    },
    {
      langOption: "Hindi",
    },
    {
      langOption: "Gujarati",
    },
    {
      langOption: "Marathi",
    },
    {
      langOption: "French",
    },
    {
      langOption: "Tamil",
    },
  ];
  return (
    <section className="conssect">
      <Navbar />
      <div className="psydata">
        <div className="filterAndSort">
          <input type="text" placeholder="Search by Name" className="searchbox" onChange={(e) => setSearchQuery(e.target.value)} />
          <div className="gridwrapper">
          <h4 className="filtheaders">Sort by</h4>
          {sortOptions.map((s) => (
            <div className="filtdata" key={s.sortOption}>
              <h4 className="filtinfo">{s.sortOption}</h4>
              <input type="radio" name="sort" value={s.sortOption} checked={selectedSortOption === s.sortOption} onChange={(e) => setSelectedSortOption(e.target.value)} />
            </div>
          ))}
          </div>
          <div className="gridwrapper">
          <h4 className="filtheaders">Rating</h4>
          {ratingFilters.map((r) => (
            <div className="filtdata" key={parseInt(r.ratingOption)}>
              <h4 className="filtinfo">{(r.ratingOption)}</h4>
              <input type="checkbox" checked={selectedRatingFilters.includes(parseInt(r.ratingOption))} onChange={() => handleRatingFilter(parseInt(r.ratingOption))} />
            </div> 
          ))}
          </div>
          <div className="gridwrapper">
          <h4 className="filtheaders">Price</h4>
          {priceFilters.map((p) => (
            <div className="filtdata" key={p.priceOption}>
              <h4 className="filtinfo">{p.priceOption}</h4>
              <input type="checkbox"
               checked={selectedPriceFilters.some(
                (filter) => filter.minPrice === p.minPrice && filter.maxPrice === p.maxPrice
              )}
              onChange={() => handlePriceFilter(p.minPrice, p.maxPrice)}
              />
            </div>
          ))}
          </div>
          <div className="gridwrapper">
          <h4 className="filtheaders">Experience</h4>
          {expFilters.map((e) => (
            <div className="filtdata" key={e.expOption}>
              <h4 className="filtinfo">{e.expOption}</h4>
              <input type="checkbox"
              checked={selectedExpFilters.some(
                (filter) => filter.minExp === e.minExp && filter.maxExp === e.maxExp
              )}
              onChange={() => handleExpFilter(e.minExp, e.maxExp)}
               />
            </div>
          ))}
          </div>
          <div className="gridwrapper">
          <h4 className="filtheaders">Location</h4>
{locationFilters
  .slice(0, showMoreLocations ? locationFilters.length : 5)
  .map((l) => (
    <div className="filtdata" key={l.locOption}>
      <h4 className="filtinfo">{l.locOption}</h4>
      <input
        type="checkbox"
        checked={selectedLocFilters.includes(l.locOption)}
        onChange={() => handleLocFilter(l.locOption)}
      />
    </div>
  ))}
{!showMoreLocations && locationFilters.length > 5 && (
  <button
    className="searchbtn"
    onClick={() => setShowMoreLocations(true)}
  >
    Show More
  </button>
)}
{showMoreLocations && (
  <button
    className="searchbtn"
    onClick={() => setShowMoreLocations(false)}
  >
    Show Less
  </button>
)}
</div>
          <div className="gridwrapper">
          <h4 className="filtheaders">Highest Degree</h4>
          {degreeFilters.map((d) => (
            <div className="filtdata" key={d.degOption}>
              <h4 className="filtinfo">{d.degOption}</h4>
              <input type="checkbox" checked={selectedDegFilters.includes(d.degOption)} onChange={() => handleDegFilter(d.degOption)}/>
            </div>
          ))}
          </div>
          <div className="gridwrapper">
          <h4 className="filtheaders">Known Languages</h4>
          {langFilters.map((la) => (
            <div className="filtdata" key={la.langOption}>
              <h4 className="filtinfo">{la.langOption}</h4>
              <input type="checkbox" checked={selectedLangFilters.includes(la.langOption)} onChange={() => handleLangFilter(la.langOption)}/>
            </div>
          ))}
          </div>
          <div className="gridwrapper">
          <h4 className="filtheaders">Gender</h4>
          {genderFilters.map((g) => (
            <div className="filtdata" key={g.genderOption}>
              <h4 className="filtinfo">{g.genderOption}</h4>
              <input type="checkbox" checked={selectedGenFilters.includes(g.genderOption)} onChange={() => handleGenFilter(g.genderOption)} />
            </div>
          ))}
          </div>

        </div>
        <div className="psyinfowrapper">
          {displayedPsy.map((p) => (
            <div className="psyinfo" key={p[0]}>
              <img className="psyimg" src="https://cdn.pixabay.com/photo/2016/11/11/04/19/sport-1815798_640.jpg" alt="" />
              <div className="pdata">
                <span>
                  <b>Name:</b>&nbsp;{p[1]}
                </span>
                <span>
                  <b>Rating:</b>&nbsp;{p[2]}
                </span>
                <span>
                  <b>Fees:</b>&nbsp;Rs. {p[9]}
                </span>
                <span>
                  <b>Experience:</b>&nbsp;{p[3]}&nbsp;years
                </span>
                <span>
                  <b>Clinic Location:</b>&nbsp;{p[4]}
                </span>
                <span>
                  <b>Gender:</b>&nbsp;{p[5]}
                </span>
                <span>
                  <b>Degree:</b>&nbsp;{p[6]}
                </span>
                <span>
                  <b>Known Languages:</b>&nbsp;{p[7]}
                </span>
                <span>
                  <b>Phone No.:</b>&nbsp;{p[8]}
                </span>
              </div>
            </div>
          ))}
          {displayCount < sortedPsy.length ? (
            <button className="searchbtn" onClick={handleShowMore}>
              Show More
            </button>
          ) : (
            <button className="searchbtn" onClick={handleShowLess}>
              Show Less
            </button>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Consultpsy;
