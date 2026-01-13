'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link'

type User = {
  id: string
  email?: string
}

// Inline SVG for warning icon
const ExclamationTriangleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    />
  </svg>
)

export default function DeleteAccountPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()

  useEffect(() => {
    fetchUser()
  }, [])

  async function fetchUser() {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
          },
        }
      )
      
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        // User is not authenticated, but we don't redirect
        // We'll show a message instead
        setUser(null)
      } else {
        setUser({ id: user.id, email: user.email })
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

 async function handleDeleteAccount() {
  if (!user || !confirmed) return

  setIsDeleting(true)
  setError(null)

  try {
    // Get current session for the access token
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      }
    )
    
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.access_token) {
      throw new Error('No active session found')
    }

    const response = await fetch('/api/delete-account', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    })

    // Check if response is JSON
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('Non-JSON response received:', text)
      throw new Error(`Server error (${response.status}): Please try again later`)
    }

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || `Failed to delete account (${response.status})`)
    }

    // Sign out and redirect to signup page
    await supabase.auth.signOut()
    router.push('/')
    
  } catch (error) {
    console.error('Delete account error:', error)
    setError(error instanceof Error ? error.message : 'Failed to delete account')
    setIsOpen(false)
  } finally {
    setIsDeleting(false)
  }
}

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  // If user is not authenticated, show login prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-12 sm:px-6 text-center">
              <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Authentication Required
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                You need to be logged in to access this page.
              </p>
              <div className="mt-6">
                <Link
                  href="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Go to Login Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Account Settings
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage your account and security settings
            </p>
          </div>
          
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Logged in as: <span className="font-medium">{user.email}</span>
                </p>
              </div>

              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Delete Your Account
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        This action cannot be undone. All your data, including:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Profile information</li>
                        <li>Account credentials</li>
                        <li>Personal settings</li>
                        <li>Any associated data</li>
                      </ul>
                      <p className="mt-2">
                        will be permanently deleted from our systems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="confirmation"
                      name="confirmation"
                      type="checkbox"
                      checked={confirmed}
                      onChange={(e) => setConfirmed(e.target.checked)}
                      className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded"
                      aria-describedby="confirmation-description"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="confirmation" className="font-medium text-gray-700">
                      I understand that this action is permanent and irreversible
                    </label>
                    <p id="confirmation-description" className="text-gray-500">
                      By checking this box, you acknowledge that all your data will be permanently deleted.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    disabled={!confirmed || isDeleting}
                    className={`
                      inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm
                      ${confirmed && !isDeleting
                        ? 'bg-red-600 hover:bg-red-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                        : 'bg-red-300 cursor-not-allowed text-white'
                      }
                    `}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete Account'}
                  </button>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Final Confirmation
                  </Dialog.Title>
                  
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you absolutely sure you want to delete your account? 
                      This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex space-x-3 justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => setIsOpen(false)}
                        disabled={isDeleting}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300"
                        onClick={handleDeleteAccount}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Deleting...
                          </>
                        ) : (
                          'Yes, Delete My Account'
                        )}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}