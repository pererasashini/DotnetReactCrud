import { Save, RotateCcw } from 'lucide-react';

const PersonForm = ({ methods, onFormReset, onFormSubmit, calculateAge, dateOfBirth }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6" style={{ marginBottom: '5px' }}>
            <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
                <input type="hidden" {...register("id")} />
                
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* First Name */}
                    <div className="flex-1">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                            First Name*
                        </label>
                        <input
                            type="text" 
                            {...register("firstName", {
                                required: true,
                                maxLength: 30
                            })}
                            className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter first name"
                        />
                        {errors.firstName?.type === 'required' && <p className="mt-1 text-sm text-red-600 flex items-center">
                            First Name is required
                        </p>}
                        {errors.firstName?.type === 'maxLength' && <p className="mt-1 text-sm text-red-600 flex items-center">
                            First Name cannot exceed 30 characters
                        </p>}
                    </div>

                    {/* Last Name */}
                    <div className="flex-1">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name*
                        </label>
                        <input
                            type="text"
                            {...register("lastName", {
                                required: true,
                                maxLength: 30
                            })}
                            className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter last name"
                        />
                        {errors.lastName?.type === 'required' && <p className="mt-1 text-sm text-red-600 flex items-center">
                            Last Name is required
                        </p>}
                        {errors.lastName?.type === 'maxLength' && <p className="mt-1 text-sm text-red-600 flex items-center">
                            Last Name cannot exceed 30 characters
                        </p>}
                    </div>
                </div>

                {/* Email Address */}
                <div>
                    <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address*
                    </label>
                    <input
                        type="email"
                        {...register("emailAddress", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Enter email address"
                    />
                    {errors.emailAddress?.type === 'required' && <p className="mt-1 text-sm text-red-600 flex items-center">
                        Email Address is required
                    </p>}
                    {errors.emailAddress?.type === 'pattern' && <p className="mt-1 text-sm text-red-600 flex items-center">
                        Please enter a valid email address
                    </p>}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Date of Birth */}
                    <div className="flex-1">
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth*
                        </label>
                        <input
                            type="date"
                            {...register("dateOfBirth", {
                                required: true
                            })}
                            className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.dateOfBirth?.type === 'required' && <p className="mt-1 text-sm text-red-600 flex items-center">
                            Date of Birth is required
                        </p>}
                    </div>

                    {/* Age (Auto-calculated) */}
                    <div className="flex-1">
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                            Age (Auto-calculated)
                        </label>
                        <input
                            type="text"
                            value={calculateAge(dateOfBirth)}
                            readOnly
                            className="w-full px-4 py-3 rounded-lg border bg-gray-100 cursor-not-allowed"
                            placeholder="Age will be auto-calculated"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Salary */}
                    <div className="flex-1">
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                            Salary*
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            {...register("salary", {
                                required: true,
                                min: { value: 0, message: "Salary must be positive" }
                            })}
                            className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter salary"
                        />
                        {errors.salary?.type === 'required' && <p className="mt-1 text-sm text-red-600 flex items-center">
                            Salary is required
                        </p>}
                        {errors.salary?.type === 'min' && <p className="mt-1 text-sm text-red-600 flex items-center">
                            Salary must be a positive number
                        </p>}
                    </div>

                    {/* Department */}
                    <div className="flex-1">
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                            Department*
                        </label>
                        <select
                            {...register("department", {
                                required: true
                            })}
                            className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Department</option>
                            <option value="IT">IT</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="Operations">Operations</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Customer Support">Customer Support</option>
                        </select>
                        {errors.department?.type === 'required' && <p className="mt-1 text-sm text-red-600 flex items-center">
                            Department is required
                        </p>}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                        type="submit"
                        className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                    </button>

                    <button
                        type="button" 
                        onClick={onFormReset}
                        className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PersonForm;