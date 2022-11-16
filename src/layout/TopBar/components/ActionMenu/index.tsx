import { FunctionComponent, useState,useEffect } from "react";
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
// *********************************************导入图标
import { Platte, Mail, FullScreen, OffScreen, HamburgerButton } from '@icon-park/react';
// *********************************************导入组件,hooks
import { useFullscreen } from 'ahooks';
import { useAppContext } from '~/context/AppContext';
import avatarUrl from '~/assets/images/profile-pic.png';
import { userDetail } from '~/services/api/user';

interface ActionMenuProps {

}

const ActionMenu: FunctionComponent<ActionMenuProps> = () => {
  const [isLogin, setIsLogin] = useState(true); // 是否登录
  const { state,dispatch } = useAppContext();
  const [username,setUsername] = useState('未登录')
  const [avatar,setavatar] = useState('http://p1.music.126.net/csVIBCTevOo9mXAtCB4wOw==/109951168062706940.jpg')

  const navigate = useNavigate();
  const [isEnabled, { enterFullscreen, exitFullscreen }] = useFullscreen(document.querySelector('html'));
  const cookie=localStorage.getItem('cookie') ? localStorage.getItem('cookie') : ''

  useEffect(() => {
    const uid =state.userId
    console.log(state);
    if(cookie.length > 0){
      
      userDetail(uid,cookie).then((res:any) =>{
        console.log(state);
        
          if(res.code == 200){
            setUsername(res.profile.nickname)
            setavatar(res.profile.avatarUrl)
            
          }
          
      })
    }
    if(state.showLoginBox =='flex'){
     setUsername('未登录')
     setavatar('http://p1.music.126.net/csVIBCTevOo9mXAtCB4wOw==/109951168062706940.jpg')
    }
 
  },[cookie])

  return (
    <ul className={styles.menuList}>
      <li>
        {/* 界面颜色 */}
        <button className="btn btn-ghost btn-sm rounded-btn">
          <Platte theme="outline" size="24" fill="#fff" />
        </button>
      </li>
      <li>
        {/* 接收的邮件 */}
        <div className="indicator mr-5">
          <div className="indicator-item badge bg-gray-500 text-xs">99+</div>
          <button className="btn btn-ghost btn-sm rounded-btn">
            <Mail theme="outline" size="24" fill="#fff" />
          </button>
        </div>
      </li>
      <li>
        {/* 全屏/缩小 */}
        {
          isEnabled ?
            <div data-tip="缩小" className="tooltip tooltip-bottom">
              <button className="btn btn-ghost btn-sm rounded-btn" onClick={exitFullscreen}>
                <OffScreen theme="outline" size="24" fill="#fff" />
              </button>
            </div>
            :
            <div data-tip="全屏" className="tooltip tooltip-bottom">
              <button className="btn btn-ghost btn-sm rounded-btn" onClick={enterFullscreen}>
                <FullScreen theme="outline" size="24" fill="#fff" />
              </button>
            </div>
        }
      </li>
      {/* 分隔线 */}
      <div className="divider divider-vertical"></div>
      {/* 用户头像和用户名 */}
      <li>
        <div className="avatar online">
          <div className="w-10 h-10 mask mask-squircle">
            <img src={avatar} />
          </div>
        </div>
        {
          isLogin ?
            <span className="ml-2 mr-1">{username}</span>
            :
            <button className="btn btn-sm btn-ghost ml-2" onClick={() => { dispatch({ type: 'setShowLoginBox', payload: true }) }}>
              未登录
            </button>
        }
      </li>
      {/* 打开抽屉 */}
      <li>
        {
          isLogin ?
            <button className="btn btn-ghost btn-sm rounded-btn" onClick={() => { dispatch({ type: 'setShowDrawer', payload: true }) }}>
              <HamburgerButton theme="outline" size="28" fill="#fff" />
            </button>
            : <></>
        }
      </li>
    </ul>
  );
}

export default ActionMenu;