/**
 * Blood Donation page.
 * Replaces the old Community section with a focused blood donation form.
 * Submits data to the backend API for admin panel access.
 */
import { useState } from 'react';
import { Heart, Droplets, CheckCircle, Loader2 } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import api from '../lib/api';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export default function CommunityPage() {
    const [formData, setFormData] = useState({
        name: '',
        last_donation_date: '',
        blood_group: '',
        phone: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.blood_group) newErrors.blood_group = 'Blood group is required';
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[\d\s+\-()]{7,20}$/.test(formData.phone.trim())) {
            newErrors.phone = 'Enter a valid phone number';
        }
        if (!formData.last_donation_date) newErrors.last_donation_date = 'Last donation date is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setLoading(true);
            await api.post('/blood-donations', formData);
            setSuccess(true);
            setFormData({ name: '', last_donation_date: '', blood_group: '', phone: '' });
        } catch (error) {
            console.error('Blood donation submission failed:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <main className="min-h-screen pt-32 pb-16 bg-surface-50">
                <div className="max-w-xl p-12 mx-auto text-center bg-white border shadow-sm rounded-3xl border-surface-100">
                    <div className="grid w-20 h-20 mx-auto mb-6 rounded-full bg-primary-50 place-items-center">
                        <CheckCircle size={40} className="text-primary-500" />
                    </div>
                    <h2 className="mb-4 text-3xl font-bold font-[family-name:var(--font-heading)] text-surface-900">
                        JazakAllahu Khairan!
                    </h2>
                    <p className="mb-8 text-surface-500">
                        Your blood donation information has been submitted successfully. May Allah reward you for your willingness to help others.
                    </p>
                    <Button onClick={() => setSuccess(false)}>Submit Another Entry</Button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-24 pb-16 bg-surface-50">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <SectionHeader
                    subtitle="Save a Life"
                    title="Blood Donation"
                    description="Register as a blood donor and help save lives in your community. Your information will be available for those in need."
                />

                <div className="max-w-2xl mx-auto">
                    {/* Info banner */}
                    <div className="flex items-start gap-4 p-5 mb-8 border bg-primary-50/50 border-primary-100 rounded-2xl">
                        <div className="grid w-12 h-12 rounded-xl bg-primary-100 place-items-center shrink-0">
                            <Droplets size={22} className="text-primary-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-primary-800">Why Donate Blood?</h3>
                            <p className="mt-1 text-sm leading-relaxed text-primary-600/80">
                                Blood donation is a noble act that can save up to 3 lives. Islam encourages helping others, and the Prophet ﷺ said: "The best of people are those who benefit others."
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-8 bg-white border shadow-sm rounded-3xl border-surface-100">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="grid w-10 h-10 rounded-xl bg-red-50 place-items-center">
                                <Heart size={20} className="text-red-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-surface-900">Donor Information</h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label htmlFor="donor-name" className="block mb-2 text-sm font-medium text-surface-700">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="donor-name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className={`w-full px-4 py-3 border rounded-xl ${errors.name ? 'border-red-300 focus:ring-red-200' : 'border-surface-200 focus:ring-primary-500/20'} focus:outline-none focus:ring-2 transition-all`}
                                />
                                {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>}
                            </div>

                            {/* Last Donation Date */}
                            <div>
                                <label htmlFor="donation-date" className="block mb-2 text-sm font-medium text-surface-700">
                                    Last Date of Donation <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="donation-date"
                                    type="date"
                                    name="last_donation_date"
                                    value={formData.last_donation_date}
                                    onChange={handleChange}
                                    max={new Date().toISOString().split('T')[0]}
                                    className={`w-full px-4 py-3 border rounded-xl ${errors.last_donation_date ? 'border-red-300 focus:ring-red-200' : 'border-surface-200 focus:ring-primary-500/20'} focus:outline-none focus:ring-2 transition-all`}
                                />
                                {errors.last_donation_date && <p className="mt-1.5 text-sm text-red-500">{errors.last_donation_date}</p>}
                            </div>

                            {/* Blood Group */}
                            <div>
                                <label htmlFor="blood-group" className="block mb-2 text-sm font-medium text-surface-700">
                                    Blood Group <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="blood-group"
                                    name="blood_group"
                                    value={formData.blood_group}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-xl ${errors.blood_group ? 'border-red-300 focus:ring-red-200' : 'border-surface-200 focus:ring-primary-500/20'} focus:outline-none focus:ring-2 transition-all bg-white appearance-none cursor-pointer`}
                                >
                                    <option value="">Select your blood group</option>
                                    {BLOOD_GROUPS.map((group) => (
                                        <option key={group} value={group}>{group}</option>
                                    ))}
                                </select>
                                {errors.blood_group && <p className="mt-1.5 text-sm text-red-500">{errors.blood_group}</p>}
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label htmlFor="donor-phone" className="block mb-2 text-sm font-medium text-surface-700">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="donor-phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="e.g., +880 1XXXXXXXXX"
                                    className={`w-full px-4 py-3 border rounded-xl ${errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-surface-200 focus:ring-primary-500/20'} focus:outline-none focus:ring-2 transition-all`}
                                />
                                {errors.phone && <p className="mt-1.5 text-sm text-red-500">{errors.phone}</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 size={18} className="animate-spin" />
                                            Submitting...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <Heart size={18} />
                                            Register as Donor
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
