import React from 'react';
import user from "../../assets/founder.webp";

const Users = () => {
    return (
        <section className="tableClass">
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Photo</th>
                            <th>Role</th>
                            <th>Since</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>#545454</td>
                            <td>Dev 1</td>
                            <td>
                                <img src={user} alt='User' />
                            </td>
                            <td>user</td>
                            <td>1 days</td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </section>
    )
}

export default Users;