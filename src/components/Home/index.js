import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <h1> Home Page</h1>
        </div>
    );
}

export default Home;
