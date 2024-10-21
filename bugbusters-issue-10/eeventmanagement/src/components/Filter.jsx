import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import './Filter.css'; // Import the CSS file for styling

function Filter() {
  return (
    <div className="filter-container">
      <DropdownButton id="dropdown-basic-button" title="Any Type" className="filter-dropdown">
        <Dropdown.Item href="#/action-1">Type 1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Type 2</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Type 3</Dropdown.Item>
      </DropdownButton>
      <DropdownButton id="dropdown-basic-button" title="Any Distance" className="filter-dropdown">
        <Dropdown.Item href="#/action-1">Distance 1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Distance 2</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Distance 3</Dropdown.Item>
      </DropdownButton>
      <Button variant="outline-secondary" className="filter-reset">Reset Filters</Button>
    </div>
  );
}

export default Filter;