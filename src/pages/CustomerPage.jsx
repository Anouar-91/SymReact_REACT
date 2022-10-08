import React from 'react'

export default function CustomerPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
         Liste des clients
        </h2>
        <table className="table table-hover table-responsive">
        <thead>
          <tr>
            <th>Id</th>
            <th>Client</th>
            <th>Email</th>
            <th>Entreprise</th>
            <th>Factures</th>
            <th>Montant total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>18</td>
            <td><a href="">Anouar Berrouane</a></td>
            <td>anoua@gmail.com</td>
            <td>lineup</td>
            <td > <span >4</span> </td>
            <td >24400€</td>
            <td>
              <button className="btn btn-sm btn-danger">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
