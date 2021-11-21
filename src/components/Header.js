// 如果要检查props值的类型，需要用到prop-types包中的PropTypes类
import PropTypes from 'prop-types'
import Button from './Button'
// react-router-dom中的useLocation用来获取当前页面的路由地址的
import {useLocation} from 'react-router-dom'


const Header = ({title, onAdd, showAdd}) => {
    const location=useLocation()


    return (
        <header className='header'>
            <h1>{title}</h1>
            {/*如果当前路由地址是localhost:3000/时，才显示Button组件*/}
            {location.pathname==='/'
            &&
            <Button
                onClick={onAdd}
                color={showAdd?'red ':'teal'}
                text={showAdd? 'Close':'Add'}/>
            }
            </header>
    );
};

Header.defaultProps={
    title: 'Task Tracker'
}

// 对props中的值的类型进行检查
Header.propTypes={
    title: PropTypes.string.isRequired
}

// const headingStyle={
//     color: 'red',
//     border: '1px solid blue'
// }

export default Header;

