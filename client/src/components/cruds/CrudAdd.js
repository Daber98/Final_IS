import React, { useState } from "react";
import { post } from "axios";
import { useNavigate } from "react-router-dom";

function CrudAdd(props) {
	const initialState = {
		companyName: "",
		phone: "",
		email: "",
		location: "",
		link: "",
		description: "",
	};
	const [crud, setCrud] = useState(initialState);

	const navigate = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();
		//if (!crud.companyName || !crud.email) return;
		async function postCrud() {
			try {
				console.log("Sending data:", crud);
				const response = await post(`${process.env.REACT_APP_API_URL}`, crud);
				navigate(`/cruds/${response.data._id}`);
			} catch (error) {
				console.log("error", error.response.data);
			}
		}
		postCrud();
	}

	function handleChange(event) {
		setCrud({ ...crud, [event.target.name]: event.target.value });
	}

	function handleCancel() {
		navigate("/cruds");
	}

	return (
		<div className="container" style={{ maxWidth: "400px" }}>
			<h1>Crear</h1>
			<hr />
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Nombre de la Compañia</label>
					<input
						name="companyName"
						type="text"
						required
						value={crud.companyName}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Telefono</label>
					<input
						name="phone"
						type="tel"
						pattern="(251)-[0-9]{3}-[0-9]{6}"
						required
						value={crud.phone}
						onChange={handleChange}
						className="form-control"
					/>
					<small>Formato: 251-XXX-XXXXXX</small>
				</div>
				<div className="form-group">
					<label>Email</label>
					<input
						name="email"
						type="email"
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
						required
						value={crud.email}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Dirección</label>
					<input
						name="location"
						type="text"
						required
						value={crud.location}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Website</label>
					<input
						name="link"
						type="url"
						value={crud.link}
						onChange={handleChange}
						className="form-control"
					/>
					<small>Formato: https://yourlink.ext</small>
				</div>

				<div className="form-group">
					<label>Descripción</label>
					<textarea
						name="description"
						rows="10"
						value={crud.description}
						onChange={handleChange}
						className="form-control"
					/>
				</div>

				<div className="btn-group">
					<input type="submit" value="Guardar" className="btn btn-primary" />
					<button
						type="button"
						onClick={handleCancel}
						className="btn btn-secondary"
					>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	);
}

export default CrudAdd;
