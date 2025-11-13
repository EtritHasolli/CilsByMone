import { X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

export function AnnouncementBar() {
  const { announcementDismissed, dismissAnnouncement } = useUIStore();

  if (announcementDismissed) return null;

  return (
    <div className="bg-brand text-surface-dark">
      <div className="container flex items-center justify-between py-2 text-sm">
        <p className="font-medium tracking-wide">
          Free standard shipping on orders over $99. Book training now and save 15%.
        </p>
        <button
          aria-label="Dismiss announcement"
          className="rounded-full p-1 hover:bg-brand-dark/10"
          onClick={dismissAnnouncement}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

