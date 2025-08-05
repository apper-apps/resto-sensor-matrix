import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../App';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
const Header = ({ onMenuClick }) => {
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await logout();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <ApperIcon name="Menu" className="h-5 w-5" />
        </Button>

        {/* Search and actions */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <ApperIcon name="Bell" className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <ApperIcon name="Settings" className="h-5 w-5" />
            </Button>
            {user && (
              <div className="flex items-center gap-3 ml-4">
                <span className="text-sm text-gray-700">
                  {user.firstName} {user.lastName}
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <ApperIcon name="LogOut" className="h-4 w-4" />
                  <span className="ml-2">Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;