import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './breadcrumbs.scss';
import Container from "../container/Container";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames.length === 0) {
        return null;
    }

    return (
        <nav className="breadcrumbs">
            <Container>
                <Link to="/" className="breadcrumb-button">Main page</Link>

                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

                    return (
                        <span key={index}>
            <span className="separator">-</span>
            <Link to={routeTo} className="breadcrumb-button">
                {decodeURIComponent(name.replace(/_/g, " "))}
            </Link>
        </span>
                    );
                })}

            </Container>
        </nav>
    );
};

export default Breadcrumbs;






