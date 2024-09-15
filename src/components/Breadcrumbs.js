import React from "react";
import { Breadcrumb } from "flowbite-react";
import { useBreadcrumbs } from "../contexts/BreadcrumbContext";
import { Link } from "react-router-dom";

const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <Breadcrumb className="py-2 px-32 bg-slate-100 mb-3" aria-label="Default breadcrumb example">
      {breadcrumbs.map((item, index) => (
        <Breadcrumb.Item>
        <Link to={item.link}>
          {item.title}
        </Link>
        </Breadcrumb.Item>
      ))}

    </Breadcrumb>
  );
};

export default Breadcrumbs;
