import { useState, useEffect } from 'react'

interface TeamMember {
  id: string
  name: string
  email: string
  avatar: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'pending' | 'inactive'
  lastActive?: string
}

interface Role {
  id: 'admin' | 'editor' | 'viewer'
  name: string
  description: string
  permissions: string[]
}

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'admin' | 'editor' | 'viewer'>('editor')
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  
  const roles: Role[] = [
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full access to all features and settings',
      permissions: [
        'Manage team members',
        'Manage billing and subscription',
        'Access all platforms',
        'Create and publish content',
        'View analytics',
        'Manage content approval',
        'Configure integrations'
      ]
    },
    {
      id: 'editor',
      name: 'Editor',
      description: 'Can create and manage content',
      permissions: [
        'Access assigned platforms',
        'Create and publish content',
        'View analytics',
        'Participate in approval workflows'
      ]
    },
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'Read-only access to content and analytics',
      permissions: [
        'View content',
        'View analytics',
        'Cannot create or publish content'
      ]
    }
  ]
  
  useEffect(() => {
    // Simulate loading team members
    setIsLoading(true)
    
    setTimeout(() => {
      // Mock team members
      const mockTeamMembers: TeamMember[] = [
        {
          id: 'user1',
          name: 'John Smith',
          email: 'john.smith@example.com',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          role: 'admin',
          status: 'active',
          lastActive: '2023-06-15T14:30:00Z'
        },
        {
          id: 'user2',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@example.com',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          role: 'editor',
          status: 'active',
          lastActive: '2023-06-14T10:15:00Z'
        },
        {
          id: 'user3',
          name: 'Mike Wilson',
          email: 'mike.wilson@example.com',
          avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          role: 'editor',
          status: 'active',
          lastActive: '2023-06-15T09:45:00Z'
        },
        {
          id: 'user4',
          name: 'Emily Davis',
          email: 'emily.davis@example.com',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          role: 'viewer',
          status: 'active',
          lastActive: '2023-06-14T16:20:00Z'
        },
        {
          id: 'user5',
          name: 'Alex Brown',
          email: 'alex.brown@example.com',
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          role: 'viewer',
          status: 'pending'
        }
      ]
      
      setTeamMembers(mockTeamMembers)
      setIsLoading(false)
    }, 1500)
  }, [])
  
  const handleInvite = () => {
    if (!inviteEmail.trim()) return
    
    // Simulate sending invitation
    const newMember: TeamMember = {
      id: `user${teamMembers.length + 1}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      role: inviteRole,
      status: 'pending'
    }
    
    setTeamMembers([...teamMembers, newMember])
    setInviteEmail('')
    setShowInviteModal(false)
  }
  
  const handleRoleChange = (memberId: string, newRole: 'admin' | 'editor' | 'viewer') => {
    setTeamMembers(teamMembers.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ))
    setShowRoleModal(false)
  }
  
  const handleRemoveMember = (memberId: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== memberId))
    }
  }
  
  const formatLastActive = (timestamp?: string) => {
    if (!timestamp) return 'Never'
    
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else if (diffDays < 7) {
      return `${diffDays}d ago`
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }
  
  const getRoleBadgeClass = (role: 'admin' | 'editor' | 'viewer') => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      case 'editor':
        return 'bg-blue-100 text-blue-800'
      case 'viewer':
        return 'bg-green-100 text-green-800'
    }
  }
  
  const getStatusBadgeClass = (status: 'active' | 'pending' | 'inactive') => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  return (
    <div className="container page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowInviteModal(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          Invite Team Member
        </button>
      </div>
      
      <div className="card mb-6">
        <h2 className="text-lg font-bold mb-4">Team Members</h2>
        
        {isLoading ? (
          <div className="text-center p-8">
            <div className="spinner mx-auto"></div>
            <p className="mt-4">Loading team members...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Last Active</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map(member => (
                  <tr key={member.id} className="border-t">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-8 h-8 rounded-full mr-3 object-cover"
                        />
                        <span>{member.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{member.email}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${getRoleBadgeClass(member.role)}`}>
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${getStatusBadgeClass(member.status)}`}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">{formatLastActive(member.lastActive)}</td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        className="btn btn-sm btn-outline mr-2"
                        onClick={() => {
                          setSelectedMember(member)
                          setShowRoleModal(true)
                        }}
                      >
                        Change Role
                      </button>
                      <button 
                        className="btn btn-sm btn-outline text-error"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <div className="card">
        <h2 className="text-lg font-bold mb-4">Role Permissions</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-3 px-4">Permission</th>
                {roles.map(role => (
                  <th key={role.id} className="text-center py-3 px-4">
                    <div className={`inline-block px-2 py-1 rounded text-xs ${getRoleBadgeClass(role.id)}`}>
                      {role.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-3 px-4">Manage team members</td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-error">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-error">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </td>
              </tr>
              <tr className="border-t">
                <td className="py-3 px-4">Manage billing and subscription</td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-error">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-error">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </td>
              </tr>
              <tr className="border-t">
                <td className="py-3 px-4">Create and publish content</td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-error">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </td>
              </tr>
              <tr className="border-t">
                <td className="py-3 px-4">View analytics</td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </td>
              </tr>
              <tr className="border-t">
                <td className="py-3 px-4">Manage content approval</td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-error">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </td>
              </tr>
              <tr className="border-t">
                <td className="py-3 px-4">Configure integrations</td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-error">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </td>
                <td className="text-center py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-error">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Invite Modal */}
      {showInviteModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3 className="text-lg font-bold">Invite Team Member</h3>
              <button 
                className="modal-close"
                onClick={() => setShowInviteModal(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-4">
                <label className="block mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="input w-full" 
                  placeholder="colleague@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Role</label>
                <select 
                  className="input w-full"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as 'admin' | 'editor' | 'viewer')}
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
                <p className="text-sm text-secondary mt-1">
                  {roles.find(role => role.id === inviteRole)?.description}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-outline mr-2"
                onClick={() => setShowInviteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleInvite}
                disabled={!inviteEmail.trim()}
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Change Role Modal */}
      {showRoleModal && selectedMember && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h3 className="text-lg font-bold">Change Role</h3>
              <button 
                className="modal-close"
                onClick={() => setShowRoleModal(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="flex items-center mb-4">
                <img 
                  src={selectedMember.avatar} 
                  alt={selectedMember.name} 
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <div className="font-medium">{selectedMember.name}</div>
                  <div className="text-sm text-secondary">{selectedMember.email}</div>
                </div>
              </div>
              
              <div className="space-y-3">
                {roles.map(role => (
                  <div 
                    key={role.id}
                    className={`role-option ${selectedMember.role === role.id ? 'selected' : ''}`}
                    onClick={() => handleRoleChange(selectedMember.id, role.id)}
                  >
                    <div className="flex items-center">
                      <div className={`role-badge ${getRoleBadgeClass(role.id)}`}>
                        {role.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{role.name}</div>
                        <div className="text-sm text-secondary">{role.description}</div>
                      </div>
                    </div>
                    <div className="role-check">
                      {selectedMember.role === role.id && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-outline"
                onClick={() => setShowRoleModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamManagement
