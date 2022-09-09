import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [category, setCategory] = useState('');
	const [company, setCompany] = useState('');
	const [error, setError] = useState(false);

	const addProduct = async () => {
		if (!name || !price || !company || !category) {
			setError(true);
			return false;
		}

		// console.warn(name,price,category,company);
		const userId = JSON.parse(localStorage.getItem('user'))._id;
		// console.warn(userId);
		const products = { name, price, category, company, userId };
		const url = 'https://rahulkaproject.herokuapp.com/add-product';

		let result = await axios.post(url, products);
		navigate('/');
	};

	return (
		<div className="product">
			<h1>Add Product</h1>
			<input
				type="text"
				placeholder="Enter product name"
				className="inputBox"
				value={name}
				onChange={e => {
					setName(e.target.value);
				}}
			/>
			{error &&
				!name &&
				<span className="invalid-input">Enter valid name</span>}
			<input
				type="text"
				placeholder="Enter product price"
				className="inputBox"
				value={price}
				onChange={e => {
					setPrice(e.target.value);
				}}
			/>
			{error &&
				!price &&
				<span className="invalid-input">Enter valid price</span>}
			<input
				type="text"
				placeholder="Enter product category"
				className="inputBox"
				value={category}
				onChange={e => {
					setCategory(e.target.value);
				}}
			/>
			{error &&
				!category &&
				<span className="invalid-input">Enter valid category</span>}
			<input
				type="text"
				placeholder="Enter product company"
				className="inputBox"
				value={company}
				onChange={e => {
					setCompany(e.target.value);
				}}
			/>
			{error &&
				!company &&
				<span className="invalid-input">Enter valid company</span>}
			<button onClick={addProduct} className="appButton">
				Add Product
			</button>
		</div>
	);
};

export default AddProduct;
