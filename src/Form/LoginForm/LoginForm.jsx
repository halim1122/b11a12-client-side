import { useForm } from 'react-hook-form';
import photo from '../../assets/ChatGPT Image Jul 11, 2025, 02_03_06 AM.png';
import useAuthContext from '../../Hook/useAuthContext';
import { Link, useNavigate } from 'react-router';
import useAxios from '../../Hook/useAxios';
import Logo from '../../Sheared/Logo/Logo';

const LoginForm = () => {

  const { register, formState: { errors }, handleSubmit } = useForm();
  const { loginUser, googleLogin, setUser } = useAuthContext();
  const navigate = useNavigate();
  const axiosInstance = useAxios();


  const onSubmit = (data) => {
    console.log(data);
    loginUser(data.email, data.password)
      .then(res => {
        console.log(res);
        setUser(res.user);
        navigate('/')
      }).catch(error => {
        console.log(error);
      })
  }
  // console.log(user.displayName)

  const handleGoogleLogin = () => {
    googleLogin().then(async (res) => {
      const userInfo = {
        email: res.user.email,
        displayName: res?.user?.displayName,
        role: 'user', //default role
        photoURL:res?.user?.photoURL,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      }

      const userRes = await axiosInstance.post('/users', userInfo);
      console.log(userRes.data)
      setUser(res.user)
      navigate('/');
    }).catch(error => {
      console.log(error)
    })
  }
  return (
    <div className="bg-white min-h-screen">
      <div className="ml-4 mt-4 md:ml-10 md:mt-10">
        <Logo />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center px-4 md:px-10 py-8 gap-6">

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[300px]">
            <h1 className="font-extrabold text-2xl md:text-4xl text-center md:text-left">Welcome Back</h1>
            <p className="font-medium mb-3 text-center md:text-left">Login with profast</p>

            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
              <div>
                <label className="font-semibold">Email</label><br />
                <input {...register('email', { required: "Email is required" })} type="email" required className="input input-bordered w-full" placeholder="Email" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="font-semibold">Password</label><br />
                <input {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters or longer",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z]).+$/,
                    message: "Password must contain at least one capital letter",
                  },
                })} type="password" className="input input-bordered w-full" placeholder="Password" />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              <div>
                <a className="link link-hover text-gray-400">Forgot password?</a>
              </div>
              <button type="submit" className="btn bg-[#acd81d] w-full text-white">Login</button>
            </form>

            <p className="mt-4 text-center md:text-left">
              <small>
                Don't have any account?
                <Link to="/register" className="text-[#acd81d] underline">Register</Link>
              </small>
            </p>

            <div className="mt-4">
              <div className="divider">OR</div>
              <button onClick={handleGoogleLogin} className="btn w-full bg-gray-200 text-black">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center bg-[#FAFDF0] py-10">
          <img
            src={photo}
            alt="Login Visual"
            className="w-[250px] md:w-[350px] lg:w-[400px] h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
