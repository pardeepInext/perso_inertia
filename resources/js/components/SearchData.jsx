import React from 'react'

const SearchData = ({ section, search }) => {

    const name = (data) => data.hasOwnProperty('name') ? data.name : data.title;
    console.log(search);
    const routeName = (key, id, name) => {
        let link = "";
        console.log(key);
        switch (key) {
            case 'Blog':
                link = route('blogs.show', { blog: id })
                break;
            case 'Category':
                link = route('category-show', { name: name })
                break;
            default:
                link = route('home');
                break;

        }

        return link;
    }

    return (
        <div className="border-bottom py-3">
            <h4 className="text-muted">In {section}s</h4>
            <ul className="list-unstyled container">
                {search.map((data, key) => (
                    <li className="mb-4 pb-3" key={key}>
                        <h4><a href={routeName(section, data.id, data.name)} className="text-dark">{name(data)}</a></h4>
                    </li>

                ))}
            </ul>
        </div>
    )
}

export default SearchData
