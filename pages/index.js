import React, { useEffect } from "react";
import Router from "next/router";
import { config } from './../src/client/utils/config';

export default function Home() {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname === "/") {
      Router.push(config.path.resume.list);
    }
  });
  return null;
}
