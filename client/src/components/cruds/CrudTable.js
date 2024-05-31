import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CrudTable() {
	const [cruds, setCruds] = useState([]);

	useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
				setCruds(response.data);
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	}, []);

	return (
		<div className="container">
			<div>
				<h2>
					CRUD - Tabla
					<p>
						<Link to="/cruds/new" className="btn btn-primary float-right">
							Crear CRUD
						</Link>
					</p>
				</h2>
				<hr />
			</div>
		
                        <div className="table-responsive">
			<table className="table riped  table-hover table-bordered container">
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Teléfono</th>
						<th>Email</th>
						<th>Dirección</th>
						<th>Ver</th>
						<th>Editar</th>
						<th>Eliminar</th>
					</tr>
				</thead>
				<tbody>
					{cruds &&
						cruds.map((crud) => {
							return (
								<tr key={crud._id}>
									<td>
										<Link to={`/cruds/${crud._id}`} className="link-line">
											{crud.companyName}
										</Link>
									</td>
									<td>{crud.phone}</td>
									<td>{crud.email}</td>
									<td>{crud.location}</td>
									<td>
										<Link to={`/cruds/${crud._id}`} className="btn btn-warning">
											Ver Información
										</Link>
									</td>
									<td>
										<Link
											to={`/cruds/${crud._id}/edit`}
											className="btn btn-success"
										>
											Editar
										</Link>
									</td>
									<td>
										<Link
											to={`/cruds/${crud._id}/delete`}
											className="btn btn-danger"
										>
											Eliminar
										</Link>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
			</div>
		</div>
	);
}

export default CrudTable;
