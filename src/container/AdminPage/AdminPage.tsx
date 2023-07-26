import React from 'react';
import {Link} from "react-router-dom";

const AdminPage = () => {
    return (
        <div>
            <nav className='d-flex justify-content-around'>
                <h2>Admin panel</h2>
                <Link className='btn btn-primary' to='/admin/addDish'>Add new dish</Link>
            </nav>
        </div>
    );
};

export default AdminPage;