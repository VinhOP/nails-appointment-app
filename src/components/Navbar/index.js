import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useSidebar } from '../../Contexts/SidebarContext';
import Button from '../Button';
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

function Navbar({
    title,
    leftButtons = false,
    modal = false,
    isModal = false,
    mediumHeight = false,
    rightIcons = [
        {
            icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
            onClick: () => {},
        },
        {
            icon: <FontAwesomeIcon icon={faBell} />,
            onClick: () => {},
        },
    ],
}) {
    const sidebar = useSidebar();

    const classes = cx('wrapper', {
        collapse: sidebar.isCollapse,
        active: modal,
        isModal: isModal,
        'medium-height': mediumHeight,
    });

    return (
        <header className={classes}>
            <div className={cx('content')}>
                {leftButtons && (
                    <span className={cx('btn-container')}>
                        {leftButtons.map((button, i) => {
                            return (
                                <Button key={i} onClick={button.onClick} className={cx('icon')}>
                                    {button.icon}
                                </Button>
                            );
                        })}
                    </span>
                )}
                <h1 className={cx('title')}> {title} </h1>
                {rightIcons && (
                    <span className={cx('btn-container')}>
                        {rightIcons.map((button, i) => {
                            return (
                                <Button
                                    key={i}
                                    onClick={button.onClick}
                                    className={cx('icon', { button: button.buttonStyle })}
                                >
                                    {button.name}
                                </Button>
                            );
                        })}
                    </span>
                )}
            </div>
        </header>
    );
}

export default Navbar;
