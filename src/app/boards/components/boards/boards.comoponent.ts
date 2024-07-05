import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../services/boards.service';
import { Workspace } from 'src/app/workspaces/models/workspace.interface';
import { Column } from '../../models/column.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/tasks/services/task.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  //  variables for sidebar and screen size
  isSidebarOpen: boolean = true;
  isScreenSmall: boolean = window.innerWidth < 768;

  // Listen for window resize events to handle responsive behavior
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isScreenSmall = window.innerWidth < 768;
    if (!this.isScreenSmall) {
      this.isSidebarOpen = true; // Ensure sidebar stays open on larger screens
    }
  }

  // Toggle sidebar open/close state
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  constructor(
    private router: ActivatedRoute,
    private boardService: BoardService,
    private taskService: TaskService
  ) {}

  // Component state variables
  boardId!: string | null;
  workspace!: Workspace;
  boards!: any;
  members!: any;
  columns: Column[] = [];
  addingColumn: boolean = false;
  newColumnName: string = '';
  addingCardIndex: number | null = null;
  newCardName: string = '';
  // Initialize the component
  ngOnInit(): void {
    // Subscribe to route parameters to get the board ID
    this.router.paramMap.subscribe(params => {
      this.boardId = params.get('boardId');
      if (this.boardId) {
        this.boardService.setBoardId(this.boardId);
        // Fetch the boards and columns for the workspace
        this.boardService.getBoardsInWorkspace(this.boardId).subscribe(
          (result) => {
            this.workspace = result.workspace;
            this.boards = result.boardDetails;
            this.members = result.boardDetails.members;
            this.columns = result.columns;
          },
          (err) => {
            console.error(err);
          }
        );
      }
    });
  }

  // Show the input field for adding a new column
  showAddColumnInput() {
    this.addingColumn = true;
  }
  // cancelling add column
  cancelAddColumn(){
    this.addingColumn = false;
  }

  // Confirm and add a new column
  confirmAddColumn() {
    if (this.newColumnName.trim()) {
      this.boardService.creatingColumn(this.boardId, this.newColumnName).subscribe(
        (savedColumn: any) => {
          this.columns.push(savedColumn);
          this.newColumnName = '';
          this.addingColumn = false;
        },
        (err) => {
          console.error('Error adding column:', err);
        }
      );
    }
  }

  // Show the input field for adding a new card to a specific column
  addCard(index: number) {
    this.addingCardIndex = index;
  }

  // Confirm and add a new card to a specific column
  confirmAddCard(columnIndex: number, columnId: string | undefined) {
    if (this.newCardName.trim() && columnId) {
      const position = this.columns[columnIndex].cards?.length ?? 0;      
      this.taskService.creatingTask(columnId, this.newCardName).subscribe(
        (task) => {
          // Find the column by its ID and push the new task to its cards array
          if(this.columns[columnIndex]!=null){
            this.columns[columnIndex].cards?.push(task)
          }
          this.newCardName = '';
          this.addingCardIndex = null;
        },
        (err) => {
          console.error('Error adding card:', err);
        }
      );
    }
  }

  // Cancel adding a new card
  cancelAddCard() {
    this.addingCardIndex = null;
    this.newCardName = '';
  }

  // Handle drag and drop events for reordering cards
  drop(event: CdkDragDrop<any[]>) {
    const previousContainerId = event.previousContainer.id.split('-').pop()
    const containerId = event.container.id.split('-').pop()
    if(previousContainerId && containerId){
      if (event.previousContainer === event.container) {
        console.log(containerId);
        console.log(event.container.data)
        // Move item within the same container
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
       
      } else {
        // Transfer item between containers
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }
 
}
