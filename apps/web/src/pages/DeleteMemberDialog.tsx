import type { Member } from '@shared-types/member/member.types';
import { AlertTriangle, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DeleteMemberDialogProps {
  member: Member | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteMemberDialog({
  member,
  open,
  onOpenChange,
  onConfirm,
}: DeleteMemberDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="mb-2 flex size-12 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-700">
            <AlertTriangle className="size-6" aria-hidden="true" />
          </div>
          <DialogTitle>Delete member?</DialogTitle>
          <DialogDescription>
            This will remove the selected member from the current session.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-md border bg-muted/40 p-3 text-sm">
          <span className="text-muted-foreground">Username</span>
          <p className="mt-1 font-medium">{member?.name ?? 'Unknown member'}</p>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={onConfirm}>
            <Trash className="size-4" aria-hidden="true" />
            Confirm delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
