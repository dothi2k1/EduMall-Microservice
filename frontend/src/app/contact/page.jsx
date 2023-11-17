"use client";
import React, { useState } from "react";
import Title from "@/components/Title";
import TransitionEffect from "@/components/TransitionEffect";
import swal from "sweetalert";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleOnclick = () => {
    if (name.length == 0 || email.length == 0 || message.length == 0) {
      setError(true);
    } else swal("Submit Successfully", "Thông tin của bạn đã được gửi thành công!", "success");
  };

  return (
    <div>
      <Title page={"Contact us"} Title={"Contact us"} />
      <TransitionEffect />
      <div className="container mx-auto px-5">
        <div className="py-20 lg:pb-16 lg:pt-16">
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-28 lg:gap-y-0">
            <div className="py-10 px-5">
              <p className="text-caption-2 lg:text-caption-1 text-primary-100 text-emerald-700 text-4xl mb-5 font-bold">
                Contact us
              </p>
              <h2 className="text-heading-4 lg:text-heading-2 mt-2 mb-7 text-4xl font-bold text-emerald-500">
                Get in Touch with Us
              </h2>
              <p className="text-body-2-regular mt-4 text-secondary-50 text-justify">
                We would love to hear from you! If you have any questions, feedback, or inquiries, feel free to reach
                out to our friendly team. We are here to assist you and provide the best possible customer service.
              </p>
              <div className="mt-10 space-y-6">
                <div className="flex items-center space-x-1.5">
                  <div className="text-primary-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      role="presentation"
                    >
                      <g transform="translate(2 3.5)">
                        <path
                          d="M11.314,0,7.048,3.434a2.223,2.223,0,0,1-2.746,0L0,0"
                          transform="translate(3.954 5.561)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                          strokeWidth="1.5px"
                        />
                        <path
                          d="M4.888,0h9.428A4.957,4.957,0,0,1,17.9,1.59a5.017,5.017,0,0,1,1.326,3.7v6.528a5.017,5.017,0,0,1-1.326,3.7,4.957,4.957,0,0,1-3.58,1.59H4.888C1.968,17.116,0,14.741,0,11.822V5.294C0,2.375,1.968,0,4.888,0Z"
                          transform="translate(0 0)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                          strokeWidth="1.5px"
                        />
                      </g>
                    </svg>
                  </div>
                  <span className="text-body-1 text-secondary-100">Email us : example@gmail.com</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="text-primary-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      role="presentation"
                    >
                      <g transform="translate(2.5 2.5)">
                        <path
                          d="M.49,2.373C.807,1.849,2.549-.056,3.793,0a1.636,1.636,0,0,1,.967.517,16.863,16.863,0,0,1,2.468,3.34C7.471,5.026,6.078,5.7,6.5,6.878a9.873,9.873,0,0,0,5.619,5.616c1.177.426,1.851-.966,3.019-.723a16.894,16.894,0,0,1,3.34,2.468,1.639,1.639,0,0,1,.517.967c.046,1.309-1.977,3.077-2.371,3.3-.93.665-2.144.654-3.624-.034C8.874,16.757,2.274,10.282.524,6-.145,4.525-.192,3.3.49,2.373Z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                          strokeWidth="1.5px"
                        />
                      </g>
                    </svg>
                  </div>
                  <span className="text-body-1 text-secondary-100">Call : +123 45678910</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="text-primary-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      role="presentation"
                    >
                      <g transform="translate(2 2)">
                        <path
                          d="M18.5,9.25A9.25,9.25,0,1,1,9.25,0,9.25,9.25,0,0,1,18.5,9.25Z"
                          transform="translate(0.75 0.751)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                          strokeWidth="1.5px"
                        />
                        <path
                          d="M3.77,7.1,0,4.847V0"
                          transform="translate(9.661 5.847)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                          strokeWidth="1.5px"
                        />
                      </g>
                    </svg>
                  </div>
                  <span className="text-body-1 text-secondary-100">Working Hours : Monday - Friday, 08 am - 05 pm</span>
                </div>
              </div>
              <div className="my-10 mx-auto border-2 border-gray-400 rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3221.842556137253!2d-82.41839962476419!3d36.146046604301716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885a6fee980fb291%3A0x17a49bceecc11cb4!2sPlant%20Palace%20Florist%20%26%20Gifts!5e0!3m2!1svi!2s!4v1691569389297!5m2!1svi!2s"
                  width={"100%"}
                  height={350}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <div className="rounded-3xl border border-secondary-10 px-5 py-10 lg:p-10">
              <h5 className="text-caption-2 lg:text-caption-1 text-primary-100 text-emerald-700 text-2xl mb-7 font-bold">
                Please use the contact details provided below to get in touch with us:
              </h5>
              <form action={process.env.DOMAIN + "/contact/saveContact"} method="POST" className="mt-8 space-y-6">
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="text-body-2-medium w-full rounded-[32px] border border-secondary-10 px-10 py-5 text-secondary-100 placeholder:text-secondary-100 focus:outline-primary-100"
                  placeholder="Name"
                  type="text"
                  name="name"
                  id="name"
                />
                {error && name.length <= 0 ? <label className="text-red-600 ml-6">Name can&apos;t be empty</label> : ""}
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-body-2-medium w-full rounded-[32px] border border-secondary-10 px-10 py-5 text-secondary-100 placeholder:text-secondary-100 focus:outline-primary-100"
                  placeholder="Email Address"
                  type="text"
                  name="email"
                  id="email"
                />
                {error && email.length <= 0 ? (
                  <label className="text-red-600 ml-6">Email can&apos;t be empty</label>
                ) : (
                  ""
                )}
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  rows={14}
                  className="text-body-2-medium w-full rounded-[32px] border border-secondary-10 px-10 py-5 text-secondary-100 placeholder:text-secondary-100 focus:outline-primary-100"
                  placeholder="Message"
                  defaultValue={""}
                  name="message"
                  id="message"
                />
                {error && message.length <= 0 ? (
                  <label className="text-red-600 ml-6">Message can&apos;t be empty</label>
                ) : (
                  ""
                )}
                <button
                  onClick={handleOnclick}
                  type="submit"
                  className="px-10 py-5 font-bold rounded-full hover:text-gray-800 hover:bg-emerald-300 bg-emerald-400 border-2 border-gray-500 duration-300 w-full text-black"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
