import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import { View, Text } from '@tarojs/components'
import { ButtonItem, InputItem } from '@components'
import './login.scss'

//conf
import { ROUTE_MAP } from '../../constants/routeConf'

//action
import { login } from '../../actions/userAction'

//utiils
import Toast from '../../utils/Toast'
import Loading from '../../utils/Loading'

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
    dispatchLogin: (...args) => dispatch(login(...args))
})
const logoImage = require('../../assets/img/login_bg.png')
let logoPhone = require('../../assets/img/login_username.png')
let logoPassword = require('../../assets/img/login_password_blue.png')

@connect(mapStateToProps, mapDispatchToProps)

export default class Login extends Component {
    static propTypes = {
        dispatchLogin: PropTypes.func.isRequired
    }
    config = {
        navigationBarTitleText: '登陆',
        navigationBarTextStyle: 'white',
        navigationBarBackgroundColor: '#2173EF'
    }

    state = {
        phoneNumber: '15925965333',
        password: '',
        phoneOnFocus: false,
        passwordOnFocus: false,
        loading: false
    }

    validateLogin() {
        const { phoneNumber,password } = this.state;
        let ret = '';
        if (!phoneNumber||!password) {
            ret = '请输入手机号或者密码!';
        }
        if (ret) {
            Toast.showToast(ret);
            return false;
        }
        return true;
    }

    handleLogin =()=> async () => {
        if (!this.validateLogin()) {
            return;
        }
        console.log('handleLogiin touch')
        const { dispatchLogin } = this.props;
        const { phoneNumber, password } = this.state;

        try {
            Loading.showMaskLoading('登录中...');
            await dispatchLogin(phoneNumber, password);
            Loading.hideLoading();
            if (this.$router.params.isBackToLastPage === 'YES') {
                Taro.navigateBack();
            } else {
                Taro.redirectTo({
                    url: ROUTE_MAP.home
                });
            }
        } catch (e) {
            console.warn(e);
            Toast.showErrorToast(e, '登录失败');
        }
    }
    //用戶名输入獲取焦點
    handlePhoneOnFocus = () => {
        this.setState({
            phoneOnFocus: true
        })
    }
    //用户名输入失去焦点
    handlePhoneOnBlur = () => {
        this.setState({
            phoneOnFocus: false
        })
    }
    //密码输入獲取焦點
    handlePasswordOnFocus = () => {
        this.setState({
            passwordOnFocus: true
        })
    }
    //密码输入失去焦点
    handlePasswordOnBlur = () => {
        this.setState({
            passwordOnFocus: false
        })
    }
    onChangePhoneNumber = (phoneNumber) => {
        this.setState({
            phoneNumber
        });
    }
    onChangePassword = (password) => {
        this.setState({
            password
        });
    };
    renderLogo() {
        return (
            <View className='logo-icon-content'>
                <Image src={logoImage} className='logo-icon' />
            </View>

        );
    }

    renderLoginForm() {
        const { phoneNumber, password, phoneOnFocus, passwordOnFocus } = this.state;
        if (phoneOnFocus) {
            logoPhone = require('../../assets/img/login_username_blue.png')
        } else {
            logoPhone = require('../../assets/img/login_username.png')
        }
        if (passwordOnFocus) {
            logoPassword = require('../../assets/img/login_password_blue.png')
        } else {
            logoPassword = require('../../assets/img/login_password.png')
        }
        return (
            <View className='login-form'>
                <View className='login-form-row'>
                    <Image src={logoPhone} className='login-form-row-small-icon' />
                    <View className='login-form-row-input'>
                        <InputItem
                            name='phoneNumber'
                            placeholder='手机号'
                            type='phone'
                            value={phoneNumber}
                            onInput={this.onChangePhoneNumber}
                            onFocus={this.handlePhoneOnFocus}
                            onBlur={this.handlePhoneOnBlur}
                        />
                    </View>
                </View>
                <View className='login-form-row'>
                    <Image src={logoPassword} className='login-form-row-small-icon' />
                    <View className='login-form-row-input'>
                        <InputItem
                            name='password'
                            placeholder='密码'
                            type='password'
                            value={password}
                            onInput={this.onChangePassword}
                            onFocus={this.handlePasswordOnFocus}
                            onBlur={this.handlePasswordOnBlur}
                        />
                    </View>

                </View>
            </View >
        );
    }
    // componentWillMount() { }
    // componentDidMount() { }
    // componentWillUnmount() { }
    // componentDidShow() { }
    // componentDidHide() { }

    render() {
        const { phoneNumber, password, loading } = this.state
        const isBtnDisabled = !phoneNumber || !password
        return (
            <View className='login-wrapper'>
                {this.renderLogo()}
                {this.renderLoginForm()}
                <View className='user-login__btn'>
                    <ButtonItem
                        text='登录'
                        loading={loading}
                        onClick={this.handleLogin()}
                        compStyle={{
                            background: '#70A5F5',
                            borderRadius: Taro.pxTransform(4)
                        }}
                        textStyle={{
                            color: isBtnDisabled ? 'rgba(255, 255, 255, 0.4)' : '#ffffff'
                        }}
                    />
                </View>

            </View>
        )
    }
}