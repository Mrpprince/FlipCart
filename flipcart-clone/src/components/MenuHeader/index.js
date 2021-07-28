import React, { useEffect } from 'react';
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../actions';

/**
 * @author
 * @function MenuHeader
 **/

const MenuHeader = () => {

    const category = useSelector(state => state.category)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllCategory())
    }, [])
    const renderCategory = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {
                        category.parentId ? <a href={category.slug}> {category.name}</a> :
                            <span> {category.name}</span>
                    }

                    {category.children.length > 0 ? (<ul>{renderCategory(category.children)}</ul>) : null}
                </li>
            )
        }
        return myCategories;
    }
    return (
        <div className="menuHeader">
            <ul>
                {
                    category.categories.length > 0 ? renderCategory(category.categories) : null
                }
            </ul>
        </div>
    );
};

export default MenuHeader;