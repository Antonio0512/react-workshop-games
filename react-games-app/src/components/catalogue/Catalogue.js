import { CatalogueItem } from "./catalogue-item/CatalogueItem";

export const Catalogue = ({ games }) => {
    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {Array.from(games).length !== 0 && (
                <>
                    {games.map((x) => (
                        <CatalogueItem key={x._id} {...x} />
                    ))}
                </>
            )}

            {Array.from(games).length === 0 && (
                <h3 className="no-articles">No articles yet</h3>
            )}
        </section>
    );
};
