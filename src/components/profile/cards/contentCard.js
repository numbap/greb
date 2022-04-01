import React, { useState } from "react";
import SalesContent from "../salesContent";
import Pricing from "../pricing";

const ContentCard = (props) => {
    return (
        <section className="card" >
            <div className="card-body card-featured-primary card-featured">
                <SalesContent />
                <Pricing />
            </div>
        </section>
    )
}

export default ContentCard;
