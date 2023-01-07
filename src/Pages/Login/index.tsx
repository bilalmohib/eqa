// Importing CSS
import './style.css';

// Importing Logo
import logo from '../../assets/Images/Login/login_logo.png';

const Login = () => {
    return (
        <div className="containerCustom">
            <div className='leftSide'>
                <h3 className='left_heading_about'>About Us</h3>
                <p className='desc_left_login'>EQA is a web based application to automate</p>
                <h1 className="heading_info_login">
                    Education Quality Assurance (EQA) an <br />
                    Accreditation Framework for NCAA & ABET
                </h1>
                <p className="bottom_desc_login">
                    EQA is a web based application to automate the end to end Academic Accreditation
                    Activities and strictly enforcing compliance requirements outlined by the
                    Accreditation Agencies around the globe to improvise educational delivery methods
                    and practices.
                </p>
                <button
                    type="button"
                    className="btn btn-outline-warning btn_learn_more"
                    data-mdb-ripple-color="dark"
                >
                    Learn More
                </button>
            </div>
            <div className='rightSide'>
                <form action="return false">
                    <img
                        className='logoRight'
                        src={logo}
                        alt={"EQA University"}
                        title={"EQA University"}
                    />
                    <h2 className='titleLoginAccount'>Login With Your Account</h2>
                    <section className='form_inputs'>
                        <div>
                            <label className='label_info'>User Name</label>
                            <input
                                className='form-control email'
                                type="text"
                                placeholder='Enter User Name'
                            />
                        </div>
                        <div>
                            <label className='label_info'>Password</label>
                            <input
                                className='form-control password'
                                type="password"
                                placeholder='Enter Password'
                            />
                        </div>
                        {/* Default radio */}
                        <div className="form-check rememberMeBlock">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">&nbsp; Remember me for the next 30 days</label>
                        </div>
                        <button type='button' className="btn btn_login">
                            Login
                        </button>
                        <div className="forgotPassword">
                            Forgot Password?
                            <a href="#">click here</a>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )
}
export default Login;