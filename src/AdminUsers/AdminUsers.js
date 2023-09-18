import React from 'react'
import './AdminUsers.css'
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';
import Footer from '../components/Footer/Footer';
import Pagination from '../components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaPlusCircle } from 'react-icons/fa';
import UserModal from '../UserModal/UserModal';
import CreateUserModal from '../CreateUserModal/CreateUserModal';
import axios from 'axios';
axios.defaults.withCredentials = true

function AdminUsers() {
    const navigate = useNavigate();
    const User = JSON.parse(sessionStorage.getItem('user'));
    const [openSidebar, setOpenSidebar] = React.useState(false);
    // const data = [];
    // for (let i = 0; i < 50; i++) {
    //     data.push(i);
    // }
    const [data, setData] = React.useState([]);
    const [finalData, setFinalData] = React.useState([]);
    const [finalDataFiltered, setFinalDataFiltered] = React.useState(finalData);
    const [totalCards, setTotalCards] = React.useState(data.length);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [cardsPerPage] = React.useState(50);
    const [searchField, setSearchField] = React.useState("");
    const [activeTab, setActiveTab] = React.useState('All'); // purchase, history
    const [userData, setUserData] = React.useState();
    const [openUserModal, setOpenUserModal] = React.useState(false);
    const [openNewUserModal, setOpenNewUserModal] = React.useState(false);
    const [allCount, setAllCount] = React.useState(0);
    const [activeCount, setActiveCount] = React.useState(0);
    const [pendingCount, setPendingCount] = React.useState(0);
    const [suspendedCount, setSuspendedCount] = React.useState(0);
    const hasWindow = typeof window !== "undefined";
    const [refresh, setRefresh] = React.useState(false);
    const [windowDimensions, setWindowDimensions] = React.useState(
        getWindowDimensions()
    );

    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null;
        return {
            width,
        };
    }

    React.useEffect(() => {
        axios.get(
            "" + process.env.REACT_APP_BACKEND_URL + "api/user/get-users",
        ).then((res) => {
            if (res.data.error) {
                console.log(res.data.message)
            } else {
                console.log(res.data.data);
                let users = [];
                res.data.data.filter((item) => {
                    if(item.role !== 'client') {
                        users.push(item);
                    }
                })
                setData(users);
            }

        }) // Replace with your actual API URL
    }, [refresh]);



    React.useEffect(() => {
        if (
            openUserModal || openNewUserModal
        ) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100vh";
            document.body.style.paddingRight = "15px";
        } else {
            document.body.style.overflow = "unset";
            document.body.style.height = "unset";
            document.body.style.paddingRight = "unset";
        }
    }, [openUserModal, openNewUserModal]);

    React.useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [hasWindow]);


    React.useEffect(() => {
        if (data) {
            setAllCount(data.length);
            setActiveCount(data.filter(item => item.userStatus === 'active').length);
            setPendingCount(data.filter(item => item.userStatus === 'pending').length);
            setSuspendedCount(data.filter(item => item.userStatus === 'suspended').length);
            if (activeTab === 'All') {
                setFinalData(data);
            } else if (activeTab === 'Active') {
                setFinalData(data.filter(item => item.userStatus === 'active'));
            } else if (activeTab === 'Pending') {
                setFinalData(data.filter(item => item.userStatus === 'pending'));
            } else if (activeTab === 'Suspended') {
                setFinalData(data.filter(item => item.userStatus === 'suspended'));
            }
        }
    }, [data, activeTab])

    React.useEffect(() => {
        setFinalDataFiltered(finalData);
    }, [finalData])

    function handleClickModal(data) {
        // console.log(data.fullname, User.fullname)
        // if (data.salePerson === User.fullname) {
        setUserData(data);
        setOpenUserModal(true)
        // }
    }

    const handleSearch = (e) => {

        if (finalData) {
            const searchText = e.target.value.toLowerCase();
            setSearchField(searchText);

            const filteredRecords = [];
            finalData.filter(record => {
                if (record.fullname.toLowerCase().includes(searchText)) {
                    filteredRecords.push(record);
                } else if(record.email.toLowerCase().includes(searchText)) {
                    filteredRecords.push(record);
                } else if(record.role.toLowerCase().includes(searchText)) {
                    filteredRecords.push(record);
                }                    
            }
            );
            console.log(filteredRecords)
            setFinalDataFiltered(filteredRecords);
        }
    };


    // const paginate = (pageNumber) => {
    //     navigate("/customer?q=" + searchField + "&pag=" + pageNumber)
    //     window.scrollTo(0, 0);
    // };

    return (
        <div className='admin__users'>
            <Sidebar setOpenSidebar={(item) => {
                setOpenSidebar(item);
            }}
                openSidebar={openSidebar}
            />
            <div className='admin__users__container' style={{ width: openSidebar ? '90%' : null }}>
                <ul class="bg">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    {/* Add other <li> elements here */}
                </ul>
                <Topbar openSidebar={openSidebar} />
                <div className='admin__users__container__section'>
                    <div className='admin__users__container__content__heading'>USERS</div>
                    <div className='admin__users__container__content'>
                        <div className='admin__users__container__content__tabs'>
                            <div className='admin__users__container__content__tabs__tab' style={activeTab === 'All' ? { backgroundColor: '#153e4d', color: '#fff' } : null} onClick={() => setActiveTab('All')}>{allCount !== 0 ? `ALL (${allCount})` : "ALL"}</div>
                            <div className='admin__users__container__content__tabs__tab' style={activeTab === 'Active' ? { backgroundColor: '#153e4d', color: '#fff' } : null} onClick={() => setActiveTab('Active')}>{activeCount !== 0 ? `Active (${activeCount})` : "Active"}</div>
                            <div className='admin__users__container__content__tabs__tab' style={activeTab === 'Pending' ? { backgroundColor: '#153e4d', color: '#fff' } : null} onClick={() => setActiveTab('Pending')}>{pendingCount !== 0 ? `Pending (${pendingCount})` : "Pending"}</div>
                            <div className='admin__users__container__content__tabs__tab' style={activeTab === 'Suspended' ? { backgroundColor: '#153e4d', color: '#fff' } : null} onClick={() => setActiveTab('Suspended')}>{suspendedCount !== 0 ? `Suspended (${suspendedCount})` : "Suspended"}</div>
                        </div>
                        <div className='admin__users__container__content__create__button'>
                            <button className='admin__users__container__content__create__button__btn' onClick={() => setOpenNewUserModal(true)} ><FaPlusCircle /><span style={{ marginLeft: '5px' }}>Create New User</span></button>
                        </div>
                        <div className='admin__users__container__content__filter'>
                            <div className='admin__users__container__content__filter__search'>
                                <input type='text' placeholder='Search by User Name, Email or Role' value={searchField} onChange={handleSearch} />
                            </div>
                            {searchField && finalDataFiltered ?
                                <div className='admin__settings__container__content__countries__filter__records__found'>Showing Records: {finalDataFiltered.length}/{finalData.length}</div>
                                :
                                <div className='admin__settings__container__content__countries__filter__records__found'>Total Records Found: {finalData.length}</div>
                            }
                            {/* <div className='admin__users__container__content__filter__records__found'>Total Records Found: {data.length}</div> */}
                        </div>
                        <div className='admin__users__container__content__table'>
                            <div className='admin__users__container__content__table__header'>
                                <div className='admin__users__container__content__table__header__item' style={{ width: '10%' }}>User ID</div>
                                <div className='admin__users__container__content__table__header__item' style={{ width: '22%' }}>User's Name</div>
                                <div className='admin__users__container__content__table__header__item' style={{ width: '22%' }}>Email</div>
                                <div className='admin__users__container__content__table__header__item' style={{ width: '20%' }}>Contact</div>
                                <div className='admin__users__container__content__table__header__item' style={{ width: '13%' }}>Role</div>
                                <div className='admin__users__container__content__table__header__item' style={{ width: '13%' }}>Status</div>
                                <div className='admin__users__container__content__table__header__item' style={{ width: '10%' }}></div>
                            </div>
                            <div className='admin__users__container__content__table__rows'>
                                {finalDataFiltered ? finalDataFiltered.map((item, index) => {
                                    return (
                                        <div className='admin__users__container__content__table__row'>
                                            <div className='admin__users__container__content__table__row__item' style={{ width: '10%', textAlign: 'center' }}>{item.user_id}</div>
                                            <div className='admin__users__container__content__table__row__item' style={{ width: '22%' }}>{item.fullname}</div>
                                            <div className='admin__users__container__content__table__row__item' style={{ width: '22%' }}>{item.email}</div>
                                            <div className='admin__users__container__content__table__row__item' style={{ width: '20%', textAlign: 'center' }}>{item.contact === "" ? '--------' : item.contact}</div>
                                            <div className='admin__users__container__content__table__row__item' style={{ width: '13%', textAlign: 'center' }}>{item.role.toUpperCase()}</div>
                                            <div className='admin__users__container__content__table__row__item' style={{ width: '13%', textAlign: 'center' }}>{item.userStatus.toUpperCase()}</div>
                                            <div className='admin__users__container__content__table__row__item' style={{ width: '9.5%', textAlign: 'center', color: '#56a8ff' }} onClick={() => handleClickModal(item)}><FaEdit size={20} /></div>
                                        </div>
                                    )
                                }
                                ) : null}
                                {/* <Pagination
                                    cardsPerPage={50}
                                    totalcards={totalCards}
                                    paginate={paginate}
                                    currentPage={currentPage}
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            {openUserModal && (
                <UserModal
                    data={userData}
                    openUserModal={openUserModal}
                    setOpenUserModal={setOpenUserModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
            {openNewUserModal && (
                <CreateUserModal
                    openNewUserModal={openNewUserModal}
                    setOpenNewUserModal={setOpenNewUserModal}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            )}
        </div>
    )
}

export default AdminUsers
