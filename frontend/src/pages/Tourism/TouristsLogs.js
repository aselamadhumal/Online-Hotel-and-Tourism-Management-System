import React from 'react'

export default function TouristsLogs() {
    return (
        <div>
            <div className='container p-3'>
                <div className='container border border-primary rounded text-start'>
                    <h3 className='card-title'>Name (FirstName + LastName)</h3>
                    <div className='row'>
                        <div className='col-5'>
                            <p>email</p>
                        </div>
                        <div className='col-5'>
                            <p>phone</p>
                        </div>
                    </div>
                </div>
                <div className='container border mt-5 border-primary rounded text-center'>
                    <h4 className='card-title text-secondary'>No Transactions Happened</h4>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Reason</th>
                                <th scope="col">Date</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
