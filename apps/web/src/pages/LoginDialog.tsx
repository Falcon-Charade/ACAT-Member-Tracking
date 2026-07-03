import { ShieldCheck } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/features/auth/auth-state';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const { signInPlaceholder } = useAuth();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription>
            Authenticate with your Google account to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 grid gap-4">
          <Button
            type="button"
            variant="outline"
            className="h-11 justify-start"
            onClick={() => {
              console.info('Placeholder Google sign in selected');
              signInPlaceholder();
              onOpenChange(false);
            }}
          >
            <FcGoogle className="size-4" aria-hidden="true" />
            Continue with Google
          </Button>

          <div className="flex items-start gap-3 rounded-md border bg-muted/40 p-3 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <p>
              Google authentication is a placeholder for now.<br />
              No account is linked and no session is created yet.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
